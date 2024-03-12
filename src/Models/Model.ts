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

interface MomentModel {
    _id: String,
    userid: String,
    createdat: Number,
    content: String,
    caption: String,
}

interface FriendModel {
    _id: String,
    userid: String,
    friendid: String,
    requestedat: Number,
    status: boolean,
}

interface RequestModel {
    user: UserModel,
    friend: FriendModel,
}

export type {UserModel, DiaryModel, MomentModel, FriendModel, RequestModel}