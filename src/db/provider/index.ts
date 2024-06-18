import {ProviderFetch} from "./providerFetch";
import {ProviderRest} from "./providerRest";

export * from "./provider";
export const Provider = {
    Fetch: ProviderFetch,
    Rest: ProviderRest,
};
