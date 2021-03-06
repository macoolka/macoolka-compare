import { LogicFold } from '../Logic'
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option'
describe('LogicFold', () => {
    it('and', () => {
         pipe(
            [],
            LogicFold.AND,
            a=>expect(a).toEqual(O.none)
         )
         pipe(
            [O.some(true)],
            LogicFold.AND,
            a=>expect(a).toEqual(O.some(true))
         )
         pipe(
            [O.some(true),O.some(true)],
            LogicFold.AND,
            a=>expect(a).toEqual(O.some(true))
         )
         pipe(
            [O.some(true),O.none],
            LogicFold.AND,
            a=>expect(a).toEqual(O.some(true))
         )
         pipe(
            [O.some(false)],
            LogicFold.AND,
            a=>expect(a).toEqual(O.some(false))
         )
         pipe(
            [O.some(false),O.some(true)],
            LogicFold.AND,
            a=>expect(a).toEqual(O.some(false))
         )
         pipe(
            [O.some(false),O.some(true),O.none],
            LogicFold.AND,
            a=>expect(a).toEqual(O.some(false))
         )
    })
    it('or', () => {
        pipe(
           [],
           LogicFold.OR,
           a=>expect(a).toEqual(O.none)
        )
        pipe(
           [O.some(true)],
           LogicFold.OR,
           a=>expect(a).toEqual(O.some(true))
        )
        pipe(
           [O.some(true),O.some(true)],
           LogicFold.OR,
           a=>expect(a).toEqual(O.some(true))
        )
        pipe(
           [O.some(true),O.none],
           LogicFold.OR,
           a=>expect(a).toEqual(O.some(true))
        )
        pipe(
           [O.some(false)],
           LogicFold.OR,
           a=>expect(a).toEqual(O.some(false))
        )
        pipe(
            [O.some(false),O.some(false),O.none],
            LogicFold.OR,
            a=>expect(a).toEqual(O.some(false))
         )
        pipe(
           [O.some(false),O.some(true)],
           LogicFold.OR,
           a=>expect(a).toEqual(O.some(true))
        )
        pipe(
           [O.some(false),O.some(true),O.none],
           LogicFold.OR,
           a=>expect(a).toEqual(O.some(true))
        )
   })
   it('not', () => {
    pipe(
       [],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.none)
    )
    pipe(
       [O.some(true)],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.some(false))
    )
    pipe(
       [O.some(true),O.some(true)],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.some(false))
    )
    pipe(
       [O.some(true),O.none],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.some(false))
    )
    pipe(
       [O.some(false)],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.some(true))
    )
    pipe(
        [O.some(false),O.some(false),O.none],
        LogicFold.NOT,
        a=>expect(a).toEqual(O.some(true))
     )
    pipe(
       [O.some(false),O.some(true)],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.some(true))
    )
    pipe(
       [O.some(false),O.some(true),O.none],
       LogicFold.NOT,
       a=>expect(a).toEqual(O.some(true))
    )
})
})
