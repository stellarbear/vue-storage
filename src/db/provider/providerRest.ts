import {ProviderFetch} from "./providerFetch";

export class ProviderRest<ID extends PropertyKey, Shape> extends ProviderFetch<ID, Shape> {
    constructor(endpoint: string) {
        super({
            getAll: {url: `/${endpoint}`, method: "GET"},
            create: {url: `/${endpoint}`, method: "PUT"},
            update: {url: `/${endpoint}/:id`, method: "POST"},
            remove: {url: `/${endpoint}/:id`, method: "DELETE"},
        });
    }

    public static for(endpoint: string) {
        return new ProviderRest(endpoint);
    }
}
