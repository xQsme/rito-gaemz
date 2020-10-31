export interface BaseReducer {
    requested: boolean;
    error: boolean;
}

export type Nullable<T> = T | null | undefined;