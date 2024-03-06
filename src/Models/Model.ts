interface UserModel {
    _id: String,
    username: string,
    password: string,
    email: string,
    available: boolean,
    avatar: string,
    createdat: Number,
    phoneNumber: String,
}

interface DiaryModel {
    _id: String,
    userid: String,
    diary: String,
    createdat: Number,
    privacy: Number,
}

export type {UserModel, DiaryModel}