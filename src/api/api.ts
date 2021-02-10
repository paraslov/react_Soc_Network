import axios from 'axios';
import { PhotoType, ProfileType, UserLogginInFormDataType, UsersType } from '../components/Common/Types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4da53247-7dc0-492e-b87c-c6f1efb3e9fc'
    },
});

//* ======== usersAPI ===========================================================================>

type getUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;                       // or "then.(response => response.data)"
        })                                              // same mean
    },

    getUserUnfollowing (userId: number) {
        return instance.delete<OperationSuccessResponseType>(`follow/${userId}`).then(response => response.data);
    },

    getUserFollowing(userId: number) {
        return instance.post<OperationSuccessResponseType>(`follow/${userId}`).then(response => response.data);
    },
}

//* ======== profileAPI ===========================================================================>

type OperationSuccessResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
} 
type SavePhotoResponseType = {
    data: {photos: PhotoType}
    resultCode: ResultCodesEnum
    messages: Array<string>
} 

export const profileAPI = {
    setUser(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => {
            return response.data;
        })
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => {
            return response.data});
    },

    updateStatus(status: string) {
        return instance.put<OperationSuccessResponseType>(`profile/status`, { status: status }).
                            then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<OperationSuccessResponseType>(`profile`, profile).then(response => response.data);
    },

    savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response => response.data);
    },
}

//* ======== authAPI ===========================================================================>

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type LoginUserResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type UserAuthorizationResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type UserLogoutResponseType = OperationSuccessResponseType

export const authAPI = {
    loginUser () {
        return instance.get<LoginUserResponseType>(`auth/me`).then(response => {return response.data});
    },
    userAuthorization (formData: UserLogginInFormDataType) {
        return instance.post<UserAuthorizationResponseType>(`auth/login`, {
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            captcha: formData.captcha }).then(response => {return response.data});
    },
    userLogout() {
        return instance.delete<UserLogoutResponseType>(`auth/login`).then(response => { return response.data });
    }
}

//* ======== securityAPI ===========================================================================>

export const securityAPI = {
    captcha () {
        return instance.get<{url: string}>(`security/get-captcha-url`).then(response => {return response.data});
    },
}

