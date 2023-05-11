/**
 * The `Exact` utility type ensures that the implementing class or object type `U`
 * contains all the properties of the object type `T` and no additional properties.
 * If the implementing object type `U` has any extra properties, it will result
 * in a TypeScript error.
 *
 * @template T - The source object type which defines the properties that should
 *               be present in the implementing object type `U`.
 * @template U - The implementing object type or class that should have all the
 *               properties from the object type `T` and no extra properties.
 */
export type Exact<T, U> = U extends T
  ? { [K in keyof U]: U[K] } extends { [K in keyof T]: T[K] }
    ? U
    : never
  : never;
