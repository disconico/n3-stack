/**
 * `EnforceKeys` is a utility type that enforces that all properties of the `U` type
 * should also exist in the `T` type. It ensures that an implementing class or type
 * does not contain any additional properties not defined in the base interface or type.
 *
 * @template T - The base type or interface that contains the allowed properties.
 * @template U - The type or class that should be checked to ensure it only contains
 * properties from the base type or interface `T`.
 *
 * @example
 * interface User {
 *   id: number;
 *   username: string;
 * }
 *
 * class UserClientDto implements EnforceKeys<User, UserClientDto> {
 *   id: number;
 *   username: string;
 *   email: string; // This will throw a TypeScript error, as `email` is not present in the `User` interface.
 * }
 */
export type EnforceKeys<T, U> = {
  [P in keyof U]: P extends keyof T ? T[P] : never;
};
