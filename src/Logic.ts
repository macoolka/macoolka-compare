/**
 * Logic 
 * @file
 */
import { semigroupAny, semigroupAll, } from 'fp-ts/lib/Semigroup'
import { fold, } from 'fp-ts/lib/Monoid'
import { Option, getMonoid, map } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export type LogicCondition = 'AND' | 'OR' | 'NOT'
export const LogicConditions: Array<'AND' | 'OR' | 'NOT'> = ['AND', 'OR', 'NOT']
/**
 * logic compare
 * @desczh
 * 逻辑比较
  * @since 0.2.0
 */
export const LogicFold: Record<LogicCondition, (a: Array<Option<boolean>>) => Option<boolean>> = {
    AND: fold(getMonoid(semigroupAll)),
    OR: fold(getMonoid(semigroupAny)),
    NOT: (a) => {
        return pipe(
            a,
            fold(getMonoid(semigroupAll)),
            map(a => !a)
        )
    }
}
