interface UserModel {
    _id: String,
    userName: string,
    password: string,
    email: string,
    available: boolean,
    avatar: string,
}

export type {UserModel}