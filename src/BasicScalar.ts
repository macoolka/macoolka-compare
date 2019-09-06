/**
 * Basic Type Compare
 * @desczh
 * 基本类型比较函数
 * @file
 */
import { Eq, eqBoolean, strictEqual } from 'fp-ts/lib/Eq'
import { pattern } from './pattern'
import {
    leq, lt, gt, geq, ordString,
    ordNumber, between, Ord, ordDate
} from 'fp-ts/lib/Ord'
import {
    contains, notContains, ins, notIn, startsWith, endsWith,
    notStartsWith, notEndsWith
} from 'macoolka-predicate/lib/string';
/**
 * Compare two object is equal.
 * @desczh
 * 比较两个对象是否相等
 * @since 0.2.0
 */
export interface Compare<A, B> {
    (x: A): (y: B) => boolean
}

/**
 * Get first param type with `Compare`
 * 
 * @desczh
 * 获得比较函数的第一个参数类型
 * 
 * @example
 * 
 * import {GetFirstParam} from 'macoolka-compare'
 * type Fisrt=GetFirstParam<(a:number)=>(b:string)=>boolean>
 * //First = number
 * 
 * @since 0.2.0
 */
export type GetFirstParam<T> = T extends Compare<infer U, any> ? U : never

/**
 * Boolean compare interface
 * 
 * @desczh
 * 布尔类型比较函数接口
 * 
 * @since 0.2.0
 */
export type CompareBoolean<A = boolean> = {
    eq: Compare<A, A>
    not: Compare<A, A>
}

/**
 * From `Eq` to CompareBoolean instance
 * @desczh
 * 从`Eq`转化到布尔比较函数接口
 * 
 * @since 0.2.0
 */
export function fromEq<A>(eq: Eq<A>): CompareBoolean<A> {
    return {
        eq: (x: A) => (y: A) => eq.equals(x, y),
        not: (x: A) => (y: A) => !eq.equals(x, y)
    }
}

/**
 * BooleanCompare instance
 * @desczh
 * BooleanCompare 实例
 * @since 0.2.0
 */
export const compareBoolean: CompareBoolean<any> = {
    ...fromEq(eqBoolean),
}


/**
 * Number compare interface
 * @desczh
 * 数值型比较接口
 * @since 0.2.0
 */
export type CompareNumber<A = number> = CompareBoolean<A> & {
    lt: Compare<A, A>
    gt: Compare<A, A>
    lte: Compare<A, A>
    gte: Compare<A, A>
    between: Compare<{ low: A, hi: A }, A>
}
/**
 * From `Ord` to  `CompareNumber` Instance
 * @desczh
 * 转换`Ord`到`CompareNumber`实例
 * @since 0.2.0
 */
export function fromOrd<A>(ord: Ord<A>): CompareNumber<A> {
    return {
        eq: (x: A) => (y: A) => ord.equals(x, y),
        not: (x: A) => (y: A) => !ord.equals(x, y),
        lt: (y: A) => (x: A) => lt(ord)(x, y),
        gt: (y: A) => (x: A) => gt(ord)(x, y),
        lte: (y: A) => (x: A) => leq(ord)(x, y),
        gte: (y: A) => (x: A) => geq(ord)(x, y),
        between: ({ low, hi }: { low: A, hi: A }) => between(ord)(low, hi)
    }
}
/**
 * `CompareNumber` instance
 * @desczh
 * `CompareNumber`实例
 * @since 0.2.0
 */
export const compareNumber: CompareNumber<any> = {
    ...fromOrd(ordNumber),
}



/**
 * String compare interface
 * @desczh
 * 字符型比较接口
 * @since 0.2.0
 */
export type CompareString<A extends string = string> = CompareNumber<A> & {

    not_contains: Compare<A, A>,
    not_starts_with: Compare<A, A>,
    not_ends_with: Compare<A, A>,
    not_in: Compare<A[], A>,
    starts_with: Compare<A, A>,
    ends_with: Compare<A, A>,
    contains: Compare<A, A>,
    in: Compare<A[], A>,
    pattern:Compare<A[]|A, A>,
}
/**
 * `CompareString` instance
 * @desczh
 * `CompareString` 实例
 * @since 0.2.0
 */
export const compareString: CompareString<any> = {
    ...fromOrd(ordString),
    contains,
    not_contains: notContains,
    starts_with: startsWith,
    ends_with: endsWith,
    not_starts_with: notStartsWith,
    not_ends_with: notEndsWith,
    in: ins,
    not_in: notIn,
    pattern,

}

/**
 * Enum compare interface
 * @desczh
 * 枚举型比较接口
 * @since 0.2.0
 */
export type CompareEnum<A> = CompareBoolean<A> & {
    in: Compare<A[], A>
    not_in: Compare<A[], A>
}

/**
 * `CompareEnum` instance
 * @desczh
 * `CompareEnum`实例
 * @since 0.2.0
 */
export const compareEnum: CompareEnum<string> = {
    ...fromEq({ equals: strictEqual }),
    in: ins,
    not_in: notIn,
}

/**
 * Date compare instance
 * @desczh
 * 日期型比较实例
 * @since 0.2.0
 */
export const compareDate: CompareNumber<Date> = {
    ...fromOrd(ordDate)
}
/**
 * Baisc compare type
 * @desczh
 * 基本的比较类型
 * @since 0.2.0
 */
export type BasicCompareType = 'string' | 'number' | 'boolean' | 'date' | 'enum'


/**
 * The contain all compare function by type
 * @desczh
 * 所有支持的比较函数，按类型拆分
 * @since 0.2.0
 */
export const compare = {
    string: compareString,
    number: compareNumber,
    boolean: compareBoolean,
    date: compareDate,
    enum: compareEnum
}


/**
 * The contain all compare function name by type
 * @desczh
 * 所有的函数名称
 * @since 0.2.0
 */
export const BasicConditionNames = {
    string: Object.keys(compareString),
    number: Object.keys(compareNumber),
    boolean: Object.keys(compareBoolean),
    enum: Object.keys(compareEnum),
    date: Object.keys(compareNumber),
}




