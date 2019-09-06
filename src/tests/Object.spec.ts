import { parseToCompareModel,CompareModel,WhereInputModel, compareModel } from '../Object'
import { personWhereModel, PersonWhere, Person } from './fixtures/Basic'
import { pipe } from 'fp-ts/lib/pipeable';
import * as  array from 'fp-ts/lib/Array'
export const wheres = parseToCompareModel<PersonWhere, Person>(personWhereModel)
const person: Person = {
    name: 'abc',
    female: true,
    age: 17
}
describe('CompareModel', () => {
    it('boolean', () => {
        const a: PersonWhere = {
            female: false
        }
        pipe(
            wheres,
            array.map(where => where(a)(person)),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({ female_not: false })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
    })
  
    it('string', () => {
        const a: PersonWhere = {
            name_starts_with: 'a'
        }
        pipe(
            wheres,
            array.map(where => where({address_not_contains:'a'})({address:'gr'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({address_not_contains:'a'})({address:'gra'})),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({address_contains:'a'})({address:'gra'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({address_contains:'a'})({address:'b'})),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({address_starts_with:'a'})({address:'ab'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({address_starts_with:'a'})({address:'bab'})),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({address_ends_with:'a'})({address:'baba'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({address_ends_with:'a'})({address:'babad'})),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({address_in:['a','b']})({address:'a'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({address_in:['a','b']})({address:'c'})),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({address_not_in:['a','b']})({address:'c'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({address_not_in:['a','b']})({address:'a'})),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where(a)(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ name: 'abc' })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ name_in: ['abc'] })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ name_pattern: ['abc'] })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ name_pattern: '**/*.txt' })({...person,name:'/a/b/c/d.txt'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ name_pattern: ['**/*.txt','!**/c/*'] })({...person,name:'/a/b/c/d.txt'})),
            array.compact,
            a => expect(a).toEqual([true])
        )
    })
    it('number', () => {
        const a: PersonWhere = {
            age: 17
        }
        pipe(
            wheres,
            array.map(where => where(a)(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ age_lt: 17 })(person)),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({ age_gt: 17 })(person)),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            wheres,
            array.map(where => where({ age_gte: 17 })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ age_lte: 17 })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            wheres,
            array.map(where => where({ age_between: { hi: 18, low: 16 } })(person)),
            array.compact,
            a => expect(a).toEqual([true])
        )
    })
})


export const filter = (whereT: CompareModel<WhereInputModel<PersonWhere>, Person>[]) =>
    (where: WhereInputModel<PersonWhere>) => (as: Person[]): Person[] =>
        as.filter(compareModel(whereT)(where)) 

export const compare = compareModel<PersonWhere, Person>(wheres);
describe('compareModel', () => {
    it('compareModel with one props', () => {
        pipe(
            { female: false, },
            compare({ female: false, }),
            result => expect(result).toEqual(true)
        )
        pipe(
            { female: false, },
            compare({ female: true, }),
            result => expect(result).toEqual(false)
        )
        pipe(
            { city: 'london', },
            compare({ city: 'london', }),
            result => expect(result).toEqual(true)
        )
        pipe(
            { city: 'beijing', },
            compare({ city: 'london', }),
            result => expect(result).toEqual(false)
        ) 

    })
     it('compareModel with mutil props', () => {
        pipe(
            { city: 'beijing', female: false },
            compare({ city: 'beijing', female: false, }),
            result => expect(result).toEqual(true)
        )
        pipe(
            { female: true, city: 'london', },
            compare({ city: 'beijing', female: false, }),
            result => expect(result).toEqual(false)
        )
    }) 

      const list: Person[] = [{
        name: 'taylor',
        age: 21,
        female: true,
        city: 'beijing',
    }, {
        name: 'john',
        age: 35,
        female: false,
        city: 'london',
    }, {
        name: 'john1',
        age: 35,
        female: true,
        city: 'london',
    }]
    it('filter empty condition', () => {
        expect(filter(wheres)({})(list).length).toEqual(list.length)
        expect(filter(wheres)({ OR: {} })(list).length).toEqual(list.length)
        expect(filter(wheres)({ AND: {} })(list).length).toEqual(list.length)
        expect(filter(wheres)({ NOT: {} })(list).length).toEqual(list.length)
        expect(filter(wheres)({ NOT: {} })(list).length).toEqual(list.length)
        expect(filter(wheres)({ NOT: { AND: {} }, OR: {}, AND: {} } as any)(list).length).toEqual(list.length)
        expect(filter(wheres)({ NOT: [{ AND: {} } as any], OR: [{}], AND: [{}] })(list).length).toEqual(list.length)
    })
    it('filter with single property ', () => {
        expect(filter(wheres)({ name_starts_with: 'jo' })(list).length).toEqual(2)
        expect(filter(wheres)({ name: 'jo' })(list).length).toEqual(0)
        expect(filter(wheres)({ name: 'taylor' })(list).length).toEqual(1)
    })
    it('filter with mutli property ', () => {
        expect(filter(wheres)({ name_starts_with: 'jo', female: true })(list).length).toEqual(1)
        expect(filter(wheres)({ name: 'jo', female: true })(list).length).toEqual(0)

    })
    it('filter with NOT', () => {
        expect(filter(wheres)({ NOT: [{ name_starts_with: 'jo' }] })(list).length).toEqual(1)
        expect(filter(wheres)({ NOT: [{ name: 'jo', female: true }] })(list).length).toEqual(3)

    })
    it('filter with OR ', () => {
        expect(filter(wheres)({ OR: [{ name_starts_with: 'jo', female: true }] })(list).length).toEqual(3)
        expect(filter(wheres)({ OR: { city: 'beijing' } })(list).length).toEqual(1)

    })
    it('filter with tree ', () => {
        expect(filter(wheres)({ OR: { name_starts_with: 'jo', NOT: { female: true } } as any})(list).length).toEqual(2)
        expect(filter(wheres)({ OR: { OR: { city: 'beijing' }, female: true, } as any })(list).length).toEqual(2)
        expect(filter(wheres)({ OR: { name_starts_with: 'jo', NOT: { female: true } } as any})(list).length).toEqual(2)
    })  
})