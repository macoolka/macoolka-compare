import * as A  from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Record'
import { CompareModel, WhereCompareModelT, compareModel, parseToCompareModel, getCompare } from './Object'
import { BasicConditionNames } from './BasicScalar'
import { pick } from 'macoolka-object'


export type CompareArray<
    W extends Record<string, any> = Record<string, any>,
    A extends Record<string, any> = Record<string, any>
    > =
    {
        some: WhereCompareModelT<W, A>
        every: WhereCompareModelT<W, A>
        // none: Compare<WhereCompareModel<W, T>, A>
    }

export const compareArray = <
    A extends Record<string, any> = Record<string, any>,
    W extends Record<string, any> = Record<string, any>,
    T extends Record<string, any> = Record<string, any>>
    (f: (a: A) => T[]) => (compareMode: CompareModel<W, T>[]): CompareArray<W, A> => {
        const predicate = compareModel(compareMode)
        const some: WhereCompareModelT<W, A> = (where) => (value) => {
            const as = f(value);
            const r = predicate(where);
            return pipe(
                as.some(a => pipe(
                    r(a),
                )),
          
            )
        }
        const every: WhereCompareModelT<W, A> = (where) => (value) => {

            const as = f(value);
            const r = predicate(where);
            return pipe(
                as.every(a => pipe(

                    r(a),

                )),
                

            )
        }
        return {
            some,
            every
        } as CompareArray<W, A>
    }
/**
 * @desczh
 * 比较模型定义
 */
export type CompareModelDefinition = Record<string, {
    string: Array<string>,
    number: Array<string>,
    boolean: Array<string>,
    enum: Array<string>
    date: Array<string>
    type: Array<string>
    types: Array<{
        name: string,
        modelName: keyof CompareModelDefinition,
        func: (a: any) => any,
    }>
}>

export const CompareConditionNames = {
    ...BasicConditionNames,
    types: ["some", "every"]
}

export const parseToCompareCollectionModel =
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>

    >
        (modelWhere: CompareModelDefinition): Record<string, CompareModel<W, T>[]> => {

        const r = pipe(
            modelWhere,
            R.map(value => {
                return {
                    model: parseToCompareModel(pick(value, ['string', 'number', 'boolean', 'enum', 'date'])),
                    type: value.type,
                    types: value.types
                }
            }),
        )
        return pipe(
            r,
            R.map(({ types, model }) =>
                pipe(
                    types,
                    A.map(({ name, modelName, func }) =>
                        pipe(
                            r[modelName]!.model,
                            compareArray(func),
                            as => getCompare(as)([name])
                        )
                    ),
                    A.flatten,
                    as => [...as, ...model]
                )

            )
        )

    }
