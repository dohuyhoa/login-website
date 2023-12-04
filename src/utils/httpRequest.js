import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'https://api.hcchineseadmin.com/api/',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};
export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response;
};

export default httpRequest;
