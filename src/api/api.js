import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4da53247-7dc0-492e-b87c-c6f1efb3e9fc'
    },
});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;                       // or "then.(response => response.data)"
        })                                              // same mean
    },

    getUserUnfollowing (userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    },

    getUserFollowing (userId) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
}

export const profileAPI = {
    setUser (userId) {
        return instance.get(`profile/` + userId).then(response => {
            return response.data;
        })
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId).then(response => {
            return response.data});
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
    },

    saveProfile(profile) {
        return instance.put(`profile`, profile).then(response => response.data);
    },

    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response => response.data);
    },
}

export const headerAPI = {
    loginUser () {
        return instance.get(`auth/me`).then(response => {return response.data});
    },
    userAuthorization (formData) {
        return instance.post(`auth/login`, {
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            captcha: formData.captcha }).then(response => {return response.data});
    },
        userLogout() {
        return instance.delete(`auth/login`).then(response => { return response.data });
    }
}
export const securityAPI = {
    captcha () {
        return instance.get(`security/get-captcha-url`).then(response => {return response.data});
    },
}

