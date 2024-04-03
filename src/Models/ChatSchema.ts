import { createRealmContext } from "@realm/react";
import { flags, Realm } from "realm";

flags.THROW_ON_GLOBAL_REALM = true;
export class ChatSchema extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    receiver!: Realm.BSON.ObjectId;
    content!: string;
    createdat!: Number;
    sender!: Realm.BSON.ObjectId;
    seen!: boolean;
    isimage!: boolean;
    static schema = {
        name: 'chatmessages',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            receiver: 'objectId',
            content: 'string',
            createdat: 'float',
            sender: 'objectId',
            seen: 'bool',
            isimage: 'bool',
        }
    };
};

export const RealmContext = createRealmContext({
    schema: [ChatSchema],
})