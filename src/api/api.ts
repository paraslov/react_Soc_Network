import axios from 'axios';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4da53247-7dc0-492e-b87c-c6f1efb3e9fc'
    },
});

//* Generic for different response data and result codes (api)
export type APIResponseType<D={}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
} 

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}





