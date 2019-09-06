 import { compareModelF } from '../ObjectFunction'
import { Person, personWhereModel, PersonWhere } from './fixtures'
export const wheres = compareModelF(personWhereModel)<PersonWhere>()
interface TestExceItem {
    whereValue: any
    expectedValue: any
    noExpectedValue: any
}
const execUnitExceItem = (as: TestExceItem[]) => {
    as.map(a => {
        expect(wheres(a.whereValue)(a.expectedValue)).toBeTruthy()
        expect(wheres(a.whereValue)(a.noExpectedValue)).toBeFalsy()
    })

}
describe('compareModel', () => {
    it('compareModel with one props', () => {
        const testExceItems: TestExceItem[] = [
            {
                whereValue: { female: false, },
                expectedValue: { female: false, },
                noExpectedValue: { female: true, }
            }, {
                whereValue: { city_not: 'beijing', },
                expectedValue: { female: false, city: 'london', },
                noExpectedValue: { female: true, city: 'beijing', }
            }]
        execUnitExceItem(testExceItems)
    })
    it('compareModel with mutil props', () => {
        const testExceItems: TestExceItem[] = [{
            whereValue: { city: 'beijing', female: false },
            expectedValue: { city: 'beijing', female: false, },
            noExpectedValue: { female: true, city: 'london', }
        }, {
            whereValue: { city: 'beijing', female: false },
            expectedValue: { city: 'beijing', female: false },
            noExpectedValue: { female: true, city: 'london', }
        }]
        execUnitExceItem(testExceItems)
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

        expect(list.filter(wheres({})).length).toEqual(list.length)
        expect(list.filter(wheres({ OR: {} })).length).toEqual(list.length)
        expect(list.filter(wheres({ AND: {} })).length).toEqual(list.length)
        expect(list.filter(wheres({ NOT: {} })).length).toEqual(list.length)
      /*   expect(list.filter(wheres({ NOT: { AND: {} }, OR: {}, AND: {} })).length).toEqual(list.length)
        expect(list.filter(wheres({ NOT: [{ AND: {} }], OR: [{ AND: [{ OR: {} }] }], AND: [{}] })).length).toEqual(list.length) */

    })
    it('filter with single property ', () => {
        expect(list.filter(wheres({ name_starts_with: 'jo' })).length).toEqual(2)
        expect(list.filter(wheres({ name: 'jo' })).length).toEqual(0)
        expect(list.filter(wheres({ name: 'taylor' })).length).toEqual(1)

    })
    it('filter with mutli property ', () => {
        expect(list.filter(wheres({ name_starts_with: 'jo', female: true })).length).toEqual(1)
        expect(list.filter(wheres({ name: 'jo', female: true })).length).toEqual(0)

    })
    it('filter with NOT', () => {
        expect(list.filter(wheres({ NOT: [{ name_starts_with: 'jo' }] })).length).toEqual(1)
        expect(list.filter(wheres({ NOT: [{ name: 'jo', female: true }] })).length).toEqual(3)


    })
    it('filter with OR ', () => {
        expect(list.filter(wheres({ OR: [{ name_starts_with: 'jo', female: true }] })).length).toEqual(3)
        expect(list.filter(wheres({ OR: { city: 'beijing' } })).length).toEqual(1)



    })
   /*  it('filter with tree ', () => {
        expect(list.filter(wheres({ OR: { name_starts_with: 'jo', NOT: { female: true } } })).length).toEqual(2)
        expect(list.filter(wheres({ OR: { OR: { city: 'beijing' }, female: true, } })).length).toEqual(2)
        expect(list.filter(wheres({ OR: { name_starts_with: 'jo', NOT: { female: true } } })).length).toEqual(2)


    }) */
}) 