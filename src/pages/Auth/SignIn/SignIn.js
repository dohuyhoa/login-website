/* eslint-disable no-useless-computed-key */
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import LoadingPage from '~/components/Loading';
import { Message } from '~/components/Modal/Message';
import * as authService from '~/services/authService';
import styles from '../Auth.module.scss';
import myUserInfo from '~/model/user-info';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [page, setPage] = useState(1);
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(0);
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [hskLevel, setHskLevel] = useState('');
    const [reason, setReason] = useState('');
    const [currentFocus, setCurrentFocus] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const handleInputChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        if (inputValue != null) {
            e.target.style.borderColor = '';
        }
        setCurrentFocus(inputName);
        myUserInfo[inputName] = inputValue;
        if (inputName === 'userName') {
            setUserName(inputValue);
        } else if (inputName === 'phoneNumber') {
            setPhoneNumber(inputValue);
        } else if (inputName === 'password') {
            setPassword(inputValue);
        } else if (inputName === 'roleId') {
            setRoleId(inputValue);
        } else if (inputName === 'hskLevel') {
            setHskLevel(inputValue);
        } else if (inputName === 'job') {
            setJob(inputValue);
        } else if (inputName === 'reason') {
            setReason(inputValue);
        } else if (inputName === 'fullName') {
            setFullName(inputValue);
        } else if (inputName === 'email') {
            setEmail(inputValue);
        }

        handleDisableSubmit();
    };
    const handleHskLevelChange = (event) => {
        setHskLevel(event.target.value);
        handleDisableSubmit();
    };

    const handleDisableSubmit = (e) => {
        if (userName !== '' && password !== '') {
            setIsSubmitDisabled(true);
        }
    };

    const handleSubmit = (e) => {
        const data = {
            // fullName,
            username: userName,
            phoneNumber: phoneNumber + '',
            hskLevel,
            roleId: '0',
            job,
            reason,
            password,
        };
        e.preventDefault();
        showErrorInput();
        const fetchApi = async () => {
            await authService.signup(data, onFetchApi);
        };
        if (isSubmitDisabled) {
            setLoading(true);
            console.log('Submit active', isSubmitDisabled);
            fetchApi();
        }
    };

    const onFetchApi = (result) => {
        console.log('Fetch', result);
        result && setLoading(false);
        result?.status === 0 && setShowMessage(true);
        result?.status > 0 && navigate('/');
        setLoading(false);
    };
    const checkErrorInput = (name) => {
        let tag = document.querySelector('[name=' + name + ']');
        if (tag != null) {
            tag.value === '' ? (tag.style.borderColor = 'red') : (tag.style.borderColor = '');
        }
    };

    const showErrorInput = () => {
        checkErrorInput('userName');
        checkErrorInput('password');
    };

    return (
        <div className={cx('login')}>
            <div className={cx('container-login')}>
                <header>Signup Form</header>
                <div className={cx('progress-bar')}>
                    <div className={cx('step')}>
                        <p className={cx({ ['active']: page === 1 })}>Name</p>
                        <div className={cx('bullet', { ['active']: page === 1 })}>
                            <span>1</span>
                        </div>
                        <div className={cx('check fas', 'fa-check')}></div>
                    </div>
                    <div className={cx('step')}>
                        <p className={cx({ ['active']: page === 2 })}>Contact</p>
                        <div className={cx('bullet', { ['active']: page === 2 })}>
                            <span>2</span>
                        </div>
                        <div className={cx('check fas fa-check')}></div>
                    </div>
                    <div className={cx('step')}>
                        <p className={cx({ ['active']: page === 3 })}>Birth</p>
                        <div className={cx('bullet', { ['active']: page === 3 })}>
                            <span>3</span>
                        </div>
                        <div className={cx('check fas fa-check')}></div>
                    </div>
                    <div className={cx('step')}>
                        <p className={cx({ ['active']: page === 4 })}>Submit</p>
                        <div className={cx('bullet', { ['active']: page === 4 })}>
                            <span>4</span>
                        </div>
                        <div className={cx('check fas fa-check')}></div>
                    </div>
                </div>
                <div className={cx('form-outer')}>
                    <form
                        action={(e) => e.preventDefault()}
                        className={cx('form-login')}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                    >
                        {page === 1 && (
                            <>
                                <div className={cx('page-auth')}>
                                    <div className={cx('title')}>Basic Info:</div>
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Full Name</div>
                                        <input value={fullName} name="fullName" type="text" />
                                    </div>
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Job</div>
                                        <input value={job} type="text" name="job" />
                                    </div>
                                    <div className={cx('field')}>
                                        <button onClick={() => setPage(2)} className={cx('firstNext', 'next')}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {page === 2 && (
                            <div className={cx('page-auth')}>
                                <div className={cx('title')}>Contact Info:</div>
                                <div className={cx('field')}>
                                    <div className={cx('label')}>Email Address</div>
                                    <input value={email} name="email" type="email" />
                                </div>
                                <div className={cx('field')}>
                                    <div className={cx('label')}>Phone Number</div>
                                    <input value={phoneNumber} name="phoneNumber" type="Number" />
                                </div>
                                <div className={cx('field', 'btns')}>
                                    <button onClick={() => setPage(1)} className={cx('prev-1', 'prev')}>
                                        Previous
                                    </button>
                                    <button onClick={() => setPage(3)} className={cx('next-1', 'next')}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {page === 3 && (
                            <div className={cx('page-auth')}>
                                <div className={cx('title')}>Reason:</div>
                                <div className={cx('field')}>
                                    <div className={cx('label')}>Reason</div>
                                    <input value={reason} name="reason" type="text" />
                                </div>
                                <div className={cx('field')}>
                                    <div className={cx('label')}>HKS Level</div>
                                    <select name="hskLevel" value={hskLevel} onChange={handleHskLevelChange}>
                                        <option value="small">small</option>
                                        <option value="medium">medium</option>
                                        <option value="large">large</option>
                                    </select>
                                </div>
                                <div className={cx('field', 'btns')}>
                                    <button onClick={() => setPage(2)} className={cx('prev-2', 'prev')}>
                                        Previous
                                    </button>
                                    <button onClick={() => setPage(4)} className={cx('next-2', 'next')}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {page === 4 && (
                            <div className={cx('page-auth')}>
                                <div className={cx('title')}>Login Details:</div>
                                <div className={cx('field')}>
                                    <div className={cx('label')}>Username</div>
                                    <input value={userName} name="userName" type="text" />
                                </div>
                                <div className={cx('field')}>
                                    <div className={cx('label')}>Password</div>
                                    <input value={password} name="password" type="password" />
                                </div>
                                <div className={cx('field', 'btns')}>
                                    <button onClick={() => setPage(3)} className={cx('prev-3', 'prev')}>
                                        Previous
                                    </button>
                                    <button onClick={handleSubmit} className={cx('submit')}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                        ;
                    </form>
                </div>
            </div>
            <LoadingPage show={loading} />
            <Message
                onHide={() => setShowMessage(false)}
                show={showMessage}
                message="Đăng ký thất bại!"
                size="sm"
                dialogClassName="text-danger text-center w-25 mx-auto"
            />
        </div>
    );
}

export default Login;
