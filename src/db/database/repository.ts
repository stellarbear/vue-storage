import {reactive} from "vue";
import type {IProvider} from "../provider";
export abstract class ARepository<ID extends PropertyKey, Shape> {
    public collection = reactive(new Map<ID, Shape>());
    abstract readonly primaryKey: (src: Shape) => ID;
    abstract readonly definitions: Record<keyof Shape, any>;

    constructor(
        protected readonly provider: IProvider<ID, Shape>
    ) { }

    getAll() {
        return Array.from(this.collection.values());
    }

    getById(id: ID | ID[]) {
        return this.collection.get(Array.isArray(id) ? id[0] : id);
    }

    async intialize() {
        const result = await this.provider.getAll();

        if (result.type === "ok") {
            this.collection = new Map(result.data.map((entry) => [this.primaryKey(entry), entry])) as any;
        }
    }

    async remove(id: ID) {
        const result = await this.provider.remove(id);

        if (result.type === "ok") {
            const item = this.collection.get(id);

            this.collection.delete(id);
            return item;
        }
    }

    async create(input: Omit<Shape, ID>) {
        const result = await this.provider.create(input);

        if (result.type === "ok") {
            const {data} = result;
            this.collection.set(this.primaryKey(data), data as any);
            return data;
        }
    }

    async update(id: ID, input: Omit<Shape, ID>) {
        const result = await this.provider.update(id, input);

        if (result.type === "ok") {
            const data = {...input, id};
            this.collection.set(id, data as any);
            return data;
        }
    }
}
