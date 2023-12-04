/* eslint-disable no-useless-computed-key */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../Auth.module.scss';
import myUserInfo from '~/model/user-info';
import LoadingPage from '~/components/Loading';
import * as authService from '~/services/authService';
import { Message } from '~/components/Modal/Message';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [currentFocus, setCurrentFocus] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {}, []);

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
        } else if (inputName === 'password') {
            setPassword(inputValue);
        }
        handleDisableSubmit();
    };

    const handleDisableSubmit = (e) => {
        if (userName !== '' && password !== '') {
            setIsSubmitDisabled(true);
        }
    };

    const handleSubmit = (e) => {
        console.log('handleDisableSubmit;;;:::', isSubmitDisabled);
        e.preventDefault();
        showErrorInput();
        const fetchApi = async () => {
            await authService.login(userName, password, onFetchApi);
        };
        if (isSubmitDisabled) {
            setLoading(true);
            console.log('Submit active', isSubmitDisabled);
            fetchApi();
        }
    };

    const onFetchApi = (result) => {
        console.log('onFetchApi', result);
        result && setLoading(false);
        result?.status === 0 && setShowMessage(true);
        if (result?.status > 0) {
            navigate('/');
        }
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
                <header>Login Form</header>
                <div className={cx('form-outer')}>
                    <form onChange={handleInputChange} onSubmit={handleSubmit} className={cx('form-login')}>
                        <div className={cx('page-auth')}>
                            <div className={cx('field')}>
                                <div className={cx('label')}>Username</div>
                                <input name="userName" type="text" />
                            </div>
                            <div className={cx('field')}>
                                <div className={cx('label')}>Password</div>
                                <input name="password" type="password" />
                            </div>
                            <div className={cx('field', 'btns')}>
                                <button type="submit" className={cx('submit')} disabled={!isSubmitDisabled}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <LoadingPage show={loading} />
            <Message
                onHide={() => setShowMessage(false)}
                show={showMessage}
                message="Đăng nhập thất bại!"
                size="sm"
                dialogClassName="text-danger text-center w-25 mx-auto"
            />
        </div>
    );
}

export default Login;
