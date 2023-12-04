import Config from '../config';
import authService from '~/services/authService';

class UserInfo {
    userName = '';
    password = '';

    async register() {
        // const postBody = {
        //     AccessToken: this.accessToken,
        //     ZaloId: this.uId,
        //     Name: this.name,
        //     Birthday: this.birthday,
        //     Gender: this.gender,
        //     Avatar: this.avatar,
        //     Email: this.email,
        //     PhoneNumber: this.phoneNumber,
        // };
        // const data = await Config.fetchData(Config.API_USER_REGISTER, postBody);
        // console.log('REGISTER USER');
        // console.log(postBody);
        // console.log(data);
        // if (data.status > 0) {
        //     //Dang ky thanh cong
        //     this.isRegistered = true;
        //     this.navigateTo('/home');
        //     this.isCheckRegiter = true;
        // }
        // return data;
    }

    login() {
        //  const result = await searchServices.search(debouncedValue);
    }
}

const myUserInfo = new UserInfo();

export default myUserInfo;
