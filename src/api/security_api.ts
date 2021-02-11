import { instance } from "./api";

//* ======== securityAPI ===========================================================================>

type CaptchaResponseType = {
	url: string
}

export const securityAPI = {
	captcha() {
		return instance.get<CaptchaResponseType>(`security/get-captcha-url`).then(response => { return response.data });
	},
}