import {DatabasePlugin} from "./plugin";
import {reactive} from "vue";
import type {IProvider} from "../provider";
import type {ARepository} from "./repository";

export type DatabaseInfer<T> = T extends Database<infer R> ? R : never;
export class Database<Description = {}> extends DatabasePlugin(Symbol("db")) {
    private readonly repositories = {} as Description;
    private constructor() {
        super();
    }

    public static initialize() {
        return new Database();
    }

    //  TODO: DI container
    public register<Key extends PropertyKey, Repository extends ARepository<any, any>, Provider extends IProvider<any, any>>(
        key: Key,
        repository: {new(provider: Provider): Repository;},
        provider: {new(): Provider;},
    ) {
        (this.repositories as any)[key] = reactive(new repository(new provider));
        return this as Database<Description & {[key in Key]: Repository;}>;
    }

    public get<Key extends keyof Description>(key: Key) {
        return this.repositories[key];
    }
}
