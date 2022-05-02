import { ObjectId } from "../../deps.ts";
import { db } from "../db/db.ts";

interface UserSchema {
    _id: ObjectId
    email: string
    password_hash: string
}

export const user = db.collection<UserSchema>('user')
