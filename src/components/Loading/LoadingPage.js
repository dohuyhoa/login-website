import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function LoadingPage({ show }) {
    return (
        <Modal
            dialogClassName="custom-loading-page"
            contentClassName="bg-transparent border-0 centered align-items-center"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={cx('loading-modal')}
        >
            <Modal.Body>
                <Spinner animation="border" role="status" variant="success"></Spinner>
            </Modal.Body>
        </Modal>
    );
}

export default LoadingPage;
