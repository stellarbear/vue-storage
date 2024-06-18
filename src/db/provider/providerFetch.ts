import type {IProvider, ProviderResponse} from "./provider";

type Methods = "GET" | "POST" | "PUT" | "DELETE";

type ProviderConfiguration = {
    getAll: {url: string; method: Methods;};
    update: {url: string; method: Methods;};
    create: {url: string; method: Methods;};
    remove: {url: string; method: Methods;};
};

export class ProviderFetch<ID extends PropertyKey, Shape> implements IProvider<ID, Shape> {
    constructor(
        protected readonly configuration: ProviderConfiguration,
    ) { }

    private async parse<T>(
        response: globalThis.Response,
        process: (data: globalThis.Response) => Promise<T> = (r) => r.json()
    ): Promise<ProviderResponse<T>> {
        if (response.ok) {
            const data = await process(response);
            return {type: "ok", data};
        } else {
            return {type: "error", message: "Ошибка"};
        }
    }

    async getAll() {
        const response = await fetch(
            this.configuration.getAll.url,
            {method: this.configuration.getAll.method}
        );

        return this.parse<Shape[]>(response);
    }

    async update(id: ID, entry: Omit<Shape, ID>) {
        const response = await fetch(
            this.configuration.update.url.replace(":id", String(id)),
            {method: this.configuration.update.method, body: JSON.stringify(entry)}
        );

        return this.parse<Shape>(response);
    }

    async create(entry: Omit<Shape, ID>) {
        const response = await fetch(
            this.configuration.create.url,
            {method: this.configuration.create.method, body: JSON.stringify(entry)}
        );

        return this.parse<Shape>(response);
    }

    async remove(id: ID) {
        const response = await fetch(
            this.configuration.remove.url.replace(":id", String(id)),
            {method: this.configuration.remove.method}
        );

        return this.parse<boolean>(response, (r) => Promise.resolve(r.ok));
    }
}
