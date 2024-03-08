import { createRealmContext } from "@realm/react";
import { flags, Realm } from "realm";

flags.THROW_ON_GLOBAL_REALM = true;
export class Task extends Realm.Object {
    _id!: Realm.BSON.ObjectID;
    title!: string;
    description!: string;

    static schema = {
        name: 'Task',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            title: 'string',
            description: 'string',
        }
    };
};

export const RealmContext = createRealmContext({
    schema: [Task],
})