type ProviderResponseSuccess<T> = {type: "ok", data: T;};
type ProviderResponseError = {type: "error", message: string;};
export type ProviderResponse<T> =
    | ProviderResponseSuccess<T>
    | ProviderResponseError;

export interface IProvider<ID extends PropertyKey, Shape> {
    getAll(): Promise<ProviderResponse<Shape[]>>;
    update(id: ID, entry: Omit<Shape, ID>): Promise<ProviderResponse<Shape>>;
    create(entry: Omit<Shape, ID>): Promise<ProviderResponse<Shape>>;
    remove(id: ID): Promise<ProviderResponse<boolean>>;
}
