export type Nullable<T> = { [K in keyof T]: T[K] | null };
export type Conditional<T> = {
  [K in keyof T]: T[K] | undefined;
};
