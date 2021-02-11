import { UserLogginInFormDataType } from "../components/Common/Types/types";
import { instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

//* ======== authAPI ===========================================================================>

type LoginUserResponseDataType = {
		id: number
		email: string
		login: string	
}
type UserAuthorizationResponseDataType = {
		userId: number
}

export const authAPI = {
	loginUser() {
		return instance.get<APIResponseType<LoginUserResponseDataType>>
			(`auth/me`).then(response => { return response.data });
	},
	userAuthorization(formData: UserLogginInFormDataType) {
		return instance.post<APIResponseType<UserAuthorizationResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>
		(`auth/login`, {
			email: formData.email,
			password: formData.password,
			rememberMe: formData.rememberMe,
			captcha: formData.captcha
		}).then(response => { return response.data });
	},
	userLogout() {
		return instance.delete<APIResponseType>(`auth/login`).then(response => { return response.data });
	}
}