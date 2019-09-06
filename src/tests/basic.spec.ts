import {
    compareString, compareBoolean, compareNumber, fromEq,compareDate,fromOrd,compareEnum
} from '../BasicScalar';
import { fromCompare, ordNumber } from 'fp-ts/lib/Ord'
import { fromEquals } from 'fp-ts/lib/Eq'
describe('CompareBoolean', () => {
    describe('compareBoolean', () => {
        it('eq', () => {
            expect(compareBoolean.eq(true)(true)).toEqual(true)
            expect(compareBoolean.eq(false)(false)).toEqual(true)
            expect(compareBoolean.eq(true)(false)).toEqual(false)
            expect(compareBoolean.eq(false)(true)).toEqual(false)
        })
        it('not', () => {
            expect(compareBoolean.not(true)(true)).toEqual(false)
            expect(compareBoolean.not(false)(false)).toEqual(false)
            expect(compareBoolean.not(true)(false)).toEqual(true)
            expect(compareBoolean.not(false)(true)).toEqual(true)
        })
    })
    describe('compareEnum', () => {
      
        it('eq', () => {
            expect(compareEnum.eq('a')('a')).toEqual(true)
            expect(compareEnum.eq('b')('a')).toEqual(false)
            expect(compareEnum.eq('a')('b')).toEqual(false)
        })
        it('not', () => {
            expect(compareEnum.not('a')('a')).toEqual(false)
            expect(compareEnum.not('b')('a')).toEqual(true)
            expect(compareEnum.not('a')('b')).toEqual(true)
        })
        it('in', () => {
            expect(compareEnum.in(['a','b'])('a')).toEqual(true)
            expect(compareEnum.in(['a','b'])('c')).toEqual(false)
        })
        it('notIn', () => {
            expect(compareEnum.not_in(['a','b'])('a')).toEqual(false)
            expect(compareEnum.not_in(['a','b'])('c')).toEqual(true)
        })
    })
    describe('compareString', () => {
        it('eq', () => {
            expect(compareString.eq('a')('a')).toEqual(true)
            expect(compareString.eq('b')('a')).toEqual(false)
            expect(compareString.eq('a')('b')).toEqual(false)
        })
        it('not', () => {
            expect(compareString.not('a')('a')).toEqual(false)
            expect(compareString.not('b')('a')).toEqual(true)
            expect(compareString.not('a')('b')).toEqual(true)
        })
        it('lt', () => {
            expect(compareString.lt('a')('a')).toEqual(false)
            expect(compareString.lt('b')('a')).toEqual(true)
            expect(compareString.lt('a')('b')).toEqual(false)
        })
        it('lte', () => {
            expect(compareString.lte('a')('a')).toEqual(true)
            expect(compareString.lte('b')('a')).toEqual(true)
            expect(compareString.lte('a')('b')).toEqual(false)
        })
        it('gt', () => {
            expect(compareString.gt('a')('a')).toEqual(false)
            expect(compareString.gt('b')('a')).toEqual(false)
            expect(compareString.gt('a')('b')).toEqual(true)
        })
        it('gte', () => {
            expect(compareString.gte('a')('a')).toEqual(true)
            expect(compareString.gte('b')('a')).toEqual(false)
            expect(compareString.gte('a')('b')).toEqual(true)
        })
        it('between', () => {
            expect(compareString.between({low:'a',hi:'c'})('a')).toEqual(true)
            expect(compareString.between({low:'a',hi:'c'})('c')).toEqual(true)
            expect(compareString.between({low:'a',hi:'c'})('b')).toEqual(true)
            expect(compareString.between({low:'b',hi:'d'})('a')).toEqual(false)
 
        })
        it('startsWith', () => {
            expect(compareString.starts_with('a')('ab')).toEqual(true)
            expect(compareString.starts_with('a')('ba')).toEqual(false)
        })
        it('notStartsWith', () => {
            expect(compareString.not_starts_with('a')('ab')).toEqual(false)
            expect(compareString.not_starts_with('a')('ba')).toEqual(true)
        })
        it('endsWith', () => {
            expect(compareString.ends_with('a')('bba')).toEqual(true)
            expect(compareString.ends_with('a')('ab')).toEqual(false)
        })
        it('notEndsWith', () => {
            expect(compareString.not_ends_with('a')('bba')).toEqual(false)
            expect(compareString.not_ends_with('a')('ab')).toEqual(true)
        })
        it('contains', () => {
            expect(compareString.contains('a')('bab')).toEqual(true)
            expect(compareString.contains('a')('bgd')).toEqual(false)
        })
        it('notContains', () => {
            expect(compareString.not_contains('a')('bab')).toEqual(false)
            expect(compareString.not_contains('a')('bgd')).toEqual(true)
        })
        it('in', () => {
            expect(compareString.in(['a','b'])('a')).toEqual(true)
            expect(compareString.in(['a','b'])('c')).toEqual(false)
        })
        it('notIn', () => {
            expect(compareString.not_in(['a','b'])('a')).toEqual(false)
            expect(compareString.not_in(['a','b'])('c')).toEqual(true)
        })
        it('pattern', () => {
            expect(compareString.pattern(['**/*.txt'])('a/b/c.txt')).toEqual(true)
            expect(compareString.pattern(['**/*.txt'])('a/b/c.jpg')).toEqual(false)
           
        })

    })
    describe('compareNumber', () => {
        it('eq', () => {
            expect(compareNumber.eq(1)(1)).toEqual(true)
            expect(compareNumber.eq(1)(2)).toEqual(false)
            expect(compareNumber.eq(2)(1)).toEqual(false)
        })
        it('not', () => {
            expect(compareNumber.not(1)(1)).toEqual(false)
            expect(compareNumber.not(1)(2)).toEqual(true)
            expect(compareNumber.not(2)(1)).toEqual(true)
        })
        it('lt', () => {
            expect(compareNumber.lt(1)(1)).toEqual(false)
            expect(compareNumber.lt(2)(1)).toEqual(true)
            expect(compareNumber.lt(1)(2)).toEqual(false)
        })
        it('lte', () => {
            expect(compareNumber.lte(1)(1)).toEqual(true)
            expect(compareNumber.lte(2)(1)).toEqual(true)
            expect(compareNumber.lte(1)(2)).toEqual(false)
        })
        it('gt', () => {
            expect(compareNumber.gt(1)(1)).toEqual(false)
            expect(compareNumber.gt(2)(1)).toEqual(false)
            expect(compareNumber.gt(1)(2)).toEqual(true)
        })
        it('gte', () => {
            expect(compareNumber.gte(1)(1)).toEqual(true)
            expect(compareNumber.gte(2)(1)).toEqual(false)
            expect(compareNumber.gte(1)(2)).toEqual(true)
        })
        it('between', () => {
            expect(compareNumber.between({low:1,hi:3})(1)).toEqual(true)
            expect(compareNumber.between({low:1,hi:3})(3)).toEqual(true)
            expect(compareNumber.between({low:1,hi:3})(2)).toEqual(true)
            expect(compareNumber.between({low:1,hi:3})(-1)).toEqual(false)
 
        })
    })
    describe('compareDate', () => {
        const a1:Date=new Date(0)
        const a2:Date=new Date(0)
        const a3:Date=new Date(1)
        it('eq', () => {
            expect(compareDate.eq(a1)(a2)).toEqual(true)
            expect(compareDate.eq(a3)(a1)).toEqual(false)
            expect(compareDate.eq(a1)(a3)).toEqual(false)
        })
        it('not', () => {
            expect(compareDate.not(a1)(a2)).toEqual(false)
            expect(compareDate.not(a3)(a1)).toEqual(true)
            expect(compareDate.not(a1)(a3)).toEqual(true)
        })
        it('lt', () => {
            expect(compareDate.lt(a1)(a2)).toEqual(false)
            expect(compareDate.lt(a3)(a1)).toEqual(true)
            expect(compareDate.lt(a1)(a3)).toEqual(false)
 
        })
        it('lte', () => {
            expect(compareDate.lte(a1)(a2)).toEqual(true)
            expect(compareDate.lte(a3)(a1)).toEqual(true)
            expect(compareDate.lte(a1)(a3)).toEqual(false)
  
        })
        it('gt', () => {
            expect(compareDate.gt(a1)(a2)).toEqual(false)
            expect(compareDate.gt(a3)(a1)).toEqual(false)
            expect(compareDate.gt(a1)(a3)).toEqual(true)
 
        })
        it('gte', () => {
            expect(compareDate.gte(a1)(a2)).toEqual(true)
            expect(compareDate.gte(a3)(a1)).toEqual(false)
            expect(compareDate.gte(a1)(a3)).toEqual(true)
        })
  
    })
    interface Person {
        name: string
        age: number
    }
    const a1 = { name: 'a', age: 1 }
    const a2 = { name: 'a', age: 2 }
    const a3 = { name: 'b', age: 1 }
    it('fromEquals', () => {

        const S1 = fromEquals<Person>((a, b) => {
            return a.name === b.name
        })

        const S = fromEq(S1)
        expect(S.eq(a1)(a1)).toEqual(true)
        expect(S.eq(a1)(a2)).toEqual(true)
        expect(S.eq(a1)(a3)).toEqual(false)
        expect(S.not(a1)(a1)).toEqual(false)
        expect(S.not(a1)(a2)).toEqual(false)
        expect(S.not(a1)(a3)).toEqual(true)

    })
    interface Person {
        name: string
        age: number
    }
 
    it('fromOrd', () => {
        const a1 = { name: 'a', age: 1 }
        const a2 = { name: 'b', age: 1 }
        const a3 = { name: 'b', age: 2 }
        const S = fromOrd(fromCompare<Person>((a, b) => {
            return ordNumber.compare(a.age, b.age)
        }))
        expect(S.eq(a1)(a1)).toEqual(true)
        expect(S.eq(a1)(a2)).toEqual(true)
        expect(S.eq(a1)(a3)).toEqual(false)
        expect(S.not(a1)(a1)).toEqual(false)
        expect(S.not(a1)(a2)).toEqual(false)
        expect(S.not(a1)(a3)).toEqual(true)
        expect(S.lt(a1)(a3)).toEqual(false)
        expect(S.lte(a1)(a3)).toEqual(false)
        expect(S.gt(a1)(a3)).toEqual(true)
        expect(S.gte(a1)(a3)).toEqual(true)
        expect(S.between({hi:a3,low:a1})(a2)).toEqual(true)
    })
  
})