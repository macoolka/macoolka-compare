/**
 * Array Compare Functions
 * @file
 */
import { Predicate } from 'fp-ts/lib/function';
export type TRuntimeBasicType = string | number | boolean;

/**
 * array compare
 * @desczh
 * 数组比较接口
 * @since 0.2.0
 */
export interface ArrayCompare<A> {
    /**
     * contain all given array value
     * @desczh
     * 包含所有的给定数组中的值
     */
    contains_every: (v: Array<A>) => Predicate<Array<A>>;
    /**
     * contain all given array value
     * @desczh
     * 至少包含一个的给定数组中的值
     */
    contains_some: (v: Array<A>) => Predicate<Array<A>>;
    /**
     * contain all given array value
     * @desczh
     * 包含给定的值
     */
    contains: (v: A) => Predicate<Array<A>>;
}
/**
 * ArrayCompare Instance
 * @desczh
 * ArrayCompare实例
 * @since 0.2.0
 */
export const arrayCompare = <A = TRuntimeBasicType>(): ArrayCompare<A> => ({
    contains_every: (v) => (value): boolean =>
        value.filter(a => v.includes(a)).length === value.length,
    contains_some: (v) => (value): boolean => value.filter(a => v.includes(a)).length > 0,
    contains: (c) => (value): boolean => value.includes(c)
});
