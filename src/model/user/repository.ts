import {ARepository} from "@/db/database/repository";
import type {User} from "./type";

export class UserRepository extends ARepository<string, User> {
    primaryKey = (src: User) => src.id;

    definitions = {
        id: String,
        name: String,
        email: String,
        registeredAt: Date,
    };
}
