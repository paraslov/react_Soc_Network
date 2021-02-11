import { UsersType } from "../components/Common/Types/types";
import { instance, APIResponseType } from "./api";

//* ======== usersAPI ===========================================================================>


export type getUsersResponseType = {
	items: Array<UsersType>
	totalCount: number
	error: string | null
}

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
			return response.data;                       // or "then.(response => response.data)"
		})                                              // same mean
	},

	getUserUnfollowing(userId: number) {
		return instance.delete<APIResponseType>(`follow/${userId}`).then(response => response.data);
	},

	getUserFollowing(userId: number) {
		return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data);
	},
}