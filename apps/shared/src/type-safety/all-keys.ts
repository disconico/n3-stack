/**
 * The `AllKeys` utility type is a combination of `EnforceKeys` and `Exact`.
 * It ensures that the implementing class or object type `U` contains all the
 * properties of the object type `T` and no additional properties.
 *
 * @template T - The source object type which defines the properties that should
 *               be present in the implementing object type `U`.
 * @template U - The implementing object type or class that should have all the
 *               properties from the object type `T` and no extra properties.
 */
import { EnforceKeys } from './enforce-keys';
import { Exact } from './exact';

export type AllKeys<T, U> = EnforceKeys<T, U> & Exact<T, U>;
