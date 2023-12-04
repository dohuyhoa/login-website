import * as httpRequest from '~/utils/httpRequest';

export const login = async (userName, password, callback) => {
    let res = {};
    try {
        res = await httpRequest.post('users/login', {
            username: userName,
            password,
        });
    } catch (error) {
        res = {
            status: 0,
            message: error.message,
        };
    }
    callback(res);
};

export const signup = async (data, callback) => {
    let res = {};
    try {
        console.log('signup', data);
        res = await httpRequest.post('users/signup', {
            ...data,
            isAdmin: true,
        });
    } catch (error) {
        res = {
            status: 0,
            message: error.message,
        };
    }
    callback(res);
};
export const changePassword = async (phoneNumber, password) => {
    try {
        const res = await httpRequest.post('api/users/change-password', {
            params: {
                phoneNumber,
                password,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
