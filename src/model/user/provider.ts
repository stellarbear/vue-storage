import {Provider} from "@/db/provider";
import type {User} from "./type";

export class UserProvider extends Provider.Rest<string, User> {
    constructor() {
        super("users");
    }
}
