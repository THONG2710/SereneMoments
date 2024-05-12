import { UserModel } from "../Models/Model"

export type HomeParamlist = {
    ListDiariesScreen: undefined,
    CreateDiaryScreen: undefined,
    ListFriends: undefined,
    OtherUsers: undefined,
    Profile: {idUser: string},
    findUser: {users: UserModel[]},
    Notification: undefined
}