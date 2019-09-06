import { pipe } from 'fp-ts/lib/pipeable'
import { KeysOfType } from 'macoolka-typescript'
import { get } from 'macoolka-object'
import * as A  from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import * as R from 'fp-ts/lib/Record'
import {
    notIn, endsInOption
} from 'macoolka-predicate/lib/string';
import { zipObject } from 'macoolka-object'
import {
    Compare, CompareEnum, CompareBoolean, CompareNumber,
    CompareString, compare, BasicCompareType, compareString, GetFirstParam
} from './BasicScalar'
import { WhereInputModel } from './Object'

import { LogicFold, LogicCondition, LogicConditions } from './Logic'


/**
 * Build a compare object with a given object and key in the object and  a type compare instance
 * @example
 * import {CompareString} from 'macoolka-compare'
 * interface User{
 *     name :string
 *     id: string
 * }
 * type UserWhere = ObjectCompare<User,CompareString,'name'|'id'>
 * 
 * //result
 * typeof UserWhere = {
 *   name: {
 *       contains: (a: string) => (value: User) => O.Option<boolean>;
 *       notContains: (a: string) => (value: User) => O.Option<boolean>;
 *       ... 12 more ...;
 *       not: (a: string) => (value: User) => O.Option<...>;
 *   };
 *   id: {
 *       ...;
 *   };
 * }
 * 
 * @since 0.2.0
 */
type ObjectCompare<
    P extends Record<string, any>,
    T extends Record<string, Compare<any, any>>,
    Keys extends keyof Required<P>,
    > = {
        [k in Keys]: {
            [ck in keyof T]: (a: GetFirstParam<T[ck]>) => (value: P) => O.Option<boolean>
        }
    }

/**
 * The seem ObjectCompare except input param is enum
 */
type ObjectCompareEnum<
    P extends Record<string, any>,
    T extends Record<any, Compare<any, any>>,
    > = {

        [ck in keyof T]: (a: GetFirstParam<T[ck]>) => (value: P) => O.Option<boolean>

    }

/**
 * Build a compare object  with a given object and key in the object and  a type compare instance
 * @since 0.2.0
 */
export const getCompareObjectWithType = <
    P extends Record<string, any>,
    T extends Record<string, Compare<any, any>>
>(compare: T) => <Keys extends keyof P>(keys: Keys[]): ObjectCompare<P, T, Keys> => {

    return pipe(
        keys,
        A.map(name => {//given propname.etc age name
            const result = pipe(
                compare,
                R.map(f => {//get condtion.etc eq not

                    return (a: GetFirstParam<T[any]>) => (value: P) => pipe( //get (a:whereValue)=>(b:object)=>Option<boolean>
                        value[name],
                        O.fromNullable,
                        O.map(v => f(a)(v!))
                    )
                }

                )
            )
            return result
        }),
        values => zipObject(keys as string[], values),//merge to a record
    ) as {
            [k in Keys]: {
                [ck in keyof T]: (a: GetFirstParam<T[ck]>) => (value: P) => O.Option<boolean>
            }
        }
}
/**
 * The definition type compare struct 
 * @since 0.2.0
 */
export type CompareModelFDefinition<
    R extends Record<string, any>,
    E extends keyof Required<R>,
    S extends keyof R = KeysOfType<Required<R>, string | E>,
    N extends keyof R = KeysOfType<Required<R>, number>,
    B extends keyof R = KeysOfType<Required<R>, boolean>,
    D extends keyof R = KeysOfType<Required<R>, Date>> = {
        string: Array<S>
        number: Array<N>,
        boolean: Array<B>,
        date: Array<D>,
        enum: Array<E>,
    }



type ResultEnumResult<P extends Record<string, any>, E extends keyof Required<P>> =
    { [key in E]: ObjectCompareEnum<P, CompareEnum<P[key]>> }

type Result<R extends Record<string, any>, E extends keyof R, S extends keyof R, N extends keyof R, B extends keyof R, D extends keyof R,
    > = ResultEnumResult<R, S> &
    ObjectCompare<R, CompareString, S> & ObjectCompare<R, CompareNumber, N>
    & ObjectCompare<R, CompareBoolean, B> & ObjectCompare<R, CompareNumber<Date>, D> & ResultEnumResult<R, E>

/**
 * 
 * @param a 
 */
export const getCompareObject = <R extends Record<string, any>,
    E extends keyof R,
    S extends keyof R = KeysOfType<R, string | E>,
    N extends keyof R = KeysOfType<R, number>,
    B extends keyof R = KeysOfType<R, boolean>,
    D extends keyof R = KeysOfType<R, Date>,
    >
    (a: CompareModelFDefinition<R, E, S, N, B, D>): Required<Result<R, E, S, N, B, D>> => {
    let result = {} as Required<Result<R, E, S, N, B, D>>
    pipe(
        Object.entries(a) as [BasicCompareType, Array<string>][],//get type and propname
        as => as.forEach(([key, value]) => {
            result = {
                ...result,
                ...getCompareObjectWithType(compare[key])(value)
            }

        })
    )
    return result
}



export const getWhereObject = <R extends Record<string, any>,
    E extends keyof R,
    S extends keyof R = KeysOfType<R, string | E>,
    N extends keyof R = KeysOfType<R, number>,
    B extends keyof R = KeysOfType<R, boolean>,
    D extends keyof R = KeysOfType<R, Date>,
    >
    (a: CompareModelFDefinition<R, E, S, N, B, D>) => (where: WhereInputModel<Required<Result<R, E, S, N, B, D>>>) => (value: R) => {


        return {
            a,
            where,
            value,
        }
    }

const conditions = Object.keys(compareString).map(a => '_' + a)
export const compareModelF = <
    R extends Record<string, any>,
    E extends keyof R,
    S extends keyof R = KeysOfType<R, string | E>,
    N extends keyof R = KeysOfType<R, number>,
    B extends keyof R = KeysOfType<R, boolean>,
    D extends keyof R = KeysOfType<R, Date>,
    >(definition: CompareModelFDefinition<R, E, S, N, B, D>) => <T>() => (where: WhereInputModel<T>) => (valueP: R) => {
        const compareObject = getCompareObject(definition)
        const go = (where: WhereInputModel<T>, condition: LogicCondition): O.Option<boolean> => {

            const childrens = pipe(
                LogicConditions,//OR|AND|NOT
                A.map(c => pipe(
                    O.fromNullable(where[c]),//exist the condtion,skip go
                    O.map((a) =>
                        a instanceof Array ?
                            pipe(
                                a,
                                A.map(w => go(w, c)),
                                LogicFold[condition]
                            )
                            : go(a, c))
                )),
                A.compact,
            )
            const selfs = pipe(
                Object.entries(where),
                A.filter(([key]) => notIn(LogicConditions)(key as any)),//remove logic condition
                A.map(([key, value]) =>
                    pipe(
                        endsInOption(conditions)(key),//split name and condition
                        O.map(a => ({
                            start: a.start,
                            end: a.end.substring(1),
                        })),
                        O.getOrElse(() => ({
                            start: key,
                            end: 'eq',
                        })),
                        ({ start, end }) => {
                            //         console.log(`${start},${end},${JSON.stringify(value)},${JSON.stringify(valueP)}`)
                            return O.fromNullable(get(compareObject, [start, end])) //exist name and condition
                        },
                        O.chain(a => {
                            //   console.log(a(value)(valueP) )
                            return a(value)(valueP) as O.Option<boolean> //execute condtion and value,get reuslt
                        })

                    )
                ),
            )
            const result = pipe( //conect self result and logic result
                selfs.concat(childrens),
                LogicFold[condition]
            )
            // console.log(result)
            return result
        }
        //  console.log('result:'+JSON.stringify(go(where, 'AND')))
        return pipe(
            go(where, 'AND'),
            O.getOrElse(() => true)
        )
    }


