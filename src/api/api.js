import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'b874f63a-0fa8-401b-bae6-9877fac73927'
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
    }
}

export const headerAPI = {
    loginUser () {
        return instance.get(`auth/me`).then(response => {return response.data});
    }
}

