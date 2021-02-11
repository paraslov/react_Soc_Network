import { PhotoType, ProfileType } from "../components/Common/Types/types";
import { instance, APIResponseType } from "./api";

//* ======== profileAPI ===========================================================================>

type SavePhotoResponseDataType = {
	photos: PhotoType
}

export const profileAPI = {
	setUser(userId: number | null) {
		return instance.get<ProfileType>(`profile/` + userId).then(response => {
			return response.data;
		})
	},

	getStatus(userId: number) {
		return instance.get<string>(`profile/status/` + userId).then(response => {
			return response.data
		});
	},

	updateStatus(status: string) {
		return instance.put<APIResponseType>(`profile/status`, { status: status }).
			then(response => response.data)
	},

	saveProfile(profile: ProfileType) {
		return instance.put<APIResponseType>(`profile`, profile).then(response => response.data);
	},

	savePhoto(file: any) {
		const formData = new FormData();
		formData.append('image', file)
		return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		}).then(response => response.data);
	},
}