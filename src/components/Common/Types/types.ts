
export type ProfileType = {
	aboutMe?: string
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	fullName: string | null
	contacts: ContactsType
	photos: PhotoType
}

export type ContactsType = {
	github: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}

export type PhotoType = {
	small: string
	large: string
}

export type UsersType = {
	id: number
	name: string
	status: string
	photos: PhotoType
	followed: boolean
}

export type DialogsDataType = {
	name: string
	userId: number
	avatar: string
}

export type UserLogginInFormDataType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

export type PostsDataType = {
	message: string
	likeCounter: number
	id: number
}