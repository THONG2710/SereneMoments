interface UserModel {
    _id: string,
    username: string,
    password: string,
    email: string,
    available: boolean,
    avatar: string,
    createdat: Number,
    phoneNumber: string,
}

interface DiaryModel {
    _id: String,
    userid: String,
    diary: String,
    createdat: Number,
    privacy: Number,
    isavailable: boolean,
}

interface MomentModel {
    _id: String,
    userid: String,
    createdat: Number,
    content: String,
    caption: String,
    isimage: Boolean
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

interface TodoList {
    _id: String,
    userid: String,
    createdat: Number,
}

interface ItemTodolist {
    _id: String,
    status: boolean,
    content: String,
    description: String,
    todoid: String,
}

interface ResponseTodo {
    unfinishedWork: ItemTodolist,
    finishedWork: ItemTodolist,
}

interface CommentsModel {
    _id: String,
    userid: String,
    momentid: String,
    content: string,
    createdat: Number,
}

interface LikesModel {
    _id: String,
    userid: String,
    momentid: String,
    createdat: Number,
}

interface ResponseCommentModel {
    _id: String,
    userid: String,
    username: String,
    avatar: String,
    momentid: String,
    content: String,
    createdat: Number
}

interface MessageModel {
    _id: String,
    receiver: String,
    content: string,
    createdat: Number,
    sender: String,
    seen: boolean,
}

interface ChatMessageModel {
    friend: UserModel,
    message: MessageModel
}

interface NotifiicationModel {
    _id: String,
    receiver: String,
    sender: String,
    content: String,
    createdat: Number,
    moment: String,
    diary: String,
}

export type { UserModel, DiaryModel, MomentModel, FriendModel, RequestModel, TodoList, ItemTodolist, ResponseTodo, CommentsModel, LikesModel, ResponseCommentModel, MessageModel, ChatMessageModel, NotifiicationModel }