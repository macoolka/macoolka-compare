/**
 * Object Compare Model
 * @desczh
 * 对象比较模型
 * @file
 */

import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import * as R from 'fp-ts/lib/Record'
import { pipe } from 'fp-ts/lib/pipeable'
import { compare, BasicConditionNames, Compare } from './BasicScalar'
import { LogicConditions, LogicFold, LogicCondition } from './Logic'
/**
 * Compare functions Struct
 * 
 * consist of name and function
 * @desczh
 * 比较函数集合
 * 
 * 由名称和函数组成
 * @exmaple
 * {
 *    eq:(a:string)=>(b:string)=>boolean
 *    not_eq:(a:string)=>(b:string)=>boolean
 * }
 * 
 */
export type CompareFunctions = {
    [k: string]: Compare<any, any>
}

export type PredicateOption<T> = (a: T) => O.Option<boolean>
/**
 * Compare Model that compare WhereInputModel and Model
 * @desczh
 * 比较模型
 * 
 * 比较WhereInputModel和Model
 * 
 * @example
 * 
 * WhereInputModel:
 * 
 * {
 *    name_starts_with:'刘',
 *    age_lt: 34
 * }
 * 
 * Model
 * {
 *   name:'刘兴',
 *   age:30
 * }
 * 
 */
export type CompareModel<
    W extends Record<string, any> = Record<string, any>,
    T extends Record<string, any> = Record<string, any>> =
    (where: WhereInputModel<W>) => PredicateOption<T>

export type WhereInputModel<T> = T & {
    AND?: Array<T> | T;
    OR?: Array<T> | T;
    NOT?: Array<T> | T;
}
export type WhereInputModel1<T> = T & {
    AND?: Array<WhereInputModel<T>> | WhereInputModel<T>;
    OR?: Array<WhereInputModel<T>> | WhereInputModel<T>;
    NOT?: Array<WhereInputModel<T>> | WhereInputModel<T>;
}
export type WhereCompareModel<
    W extends Record<string, any> = Record<string, any>,
    T extends Record<string, any> = Record<string, any>> =
     Compare<WhereInputModel<W>, T>

export type WhereCompareModelT<
    W extends Record<string, any> = Record<string, any>,
    T extends Record<string, any> = Record<string, any>> = Compare<WhereInputModel<W>, T>

/**
 * Define a Compare Object Model
 * @desczh
 * 比较模型定义
 * @since 0.2.0
 */
export type CompareObjectModelDefinition = {
    string: Array<string>,
    number: Array<string>,
    boolean: Array<string>,
    enum: Array<string>
    date: Array<string>
}
/**
 * CompareModel Group by type
 */
export type CompareModelStruct = Record<string, CompareModel>


export const getWherePropsName = (name: string) => (condition: string) => condition === 'eq' ? name : name + '_' + condition
/**
 * build Compare Model with  CompareFunctions and prop name
 * @desczh
 * 使用比较函数集合和模型属性名数组生成比较模型
 * 
 */
export const getCompare = (as: CompareFunctions) =>
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >
        (propname: string[]):
        CompareModel<W, T>[] => pipe(
            propname,
            A.map(name =>
                pipe(
                    R.toArray(as),
                    A.map(([key, value]) => {
                        //
                        const whereName = getWherePropsName(name)(key)
                        const predicate: CompareModel<W, T> = (where) => {

                            return pipe(
                                O.fromNullable(where[whereName]),//check where object have value on the name
                                O.fold(() =>
                                    () => O.none
                                    , whereValue => {

                                        return (eo: T): O.Option<boolean> => {
                                            return pipe(
                                                O.fromNullable(eo && eo[name]),
                                                O.map(eoValue => {
                                                     return value(whereValue)(eoValue) as boolean
                                                }),
                                            )
                                        }
                                    })
                            )
                        }
                        return ({
                            name: whereName,
                            predicate
                        })
                    })
                ),
            ),
            A.flatten,
            (as) => {
                let result: Record<string, CompareModel<W, T>> = {}
                as.forEach(a => {
                    result[a.name] = a.predicate
                })
                return result
            },
            a => {
                const b = Object.values(a);
                return b
            }

        )

/**
 * 
 * @since 0.2.0
 */
export const parseToCompareModel =
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >

        (modelWhere: CompareObjectModelDefinition): CompareModel<W, T>[] =>
        pipe(
            modelWhere,
            R.mapWithIndex((key, value) => {
                return getCompare(compare[key])<W, T>(value)
            }),
            a => {
                const b = Object.values(a).map(b => Object.values(b))
                return A.flatten(b)
            }
        )


/**
 * create a where's propery name
 * @since 0.2.0
 */
export const parseToWherePropName = (modelWhere: CompareObjectModelDefinition) =>
    pipe(
        modelWhere,
        R.mapWithIndex((key, value: any) => {
            return pipe(
                value as string[],
                A.map(name =>
                    pipe(
                        BasicConditionNames[key],
                        A.map(getWherePropsName(name))
                    )
                ),
                A.flatten
            )
        })
    )
/**
 * compare WhereInputModel and Model with CompareModel
 * @since 0.2.0
 */
export const compareModel =
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >
        (whereT: CompareModel<W, T>[]): WhereCompareModel<W, T> => (where: WhereInputModel<W>) => {
 
            const go = (innerWhere: WhereInputModel<W>, condition: LogicCondition) => (eo: any): O.Option<boolean> => {
  
                const childrens = pipe(
                    LogicConditions,
                    A.map(c => pipe(
                        R.lookup(c, innerWhere),
                        O.map(a =>
                            a instanceof Array ?
                                pipe(
                                    a,
                                    A.map(w => go(w, c)(eo)),
                                    LogicFold[condition]
                                )
                                : go(a, c)(eo))
                    )),
                    A.compact,
                )
                const selfs = pipe(
                    whereT,
                    A.map(a => a(innerWhere)),

                    A.map(precidate => precidate(eo)),
                )
                const result = pipe(
                    selfs.concat(childrens),
                    LogicFold[condition]
                )
                return result
            }
            return (eo: T) => pipe(
                go(where, 'AND')(eo),
                O.getOrElse(():boolean => true)
            )
        }