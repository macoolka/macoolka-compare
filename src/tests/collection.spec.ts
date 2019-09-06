import { CompareModel, WhereInputModel, compareModel } from '../Object'
import { parseToCompareCollectionModel } from '../Collection'
import { FolderWhere, StoreWhereModel, Folder } from './fixtures/Collection'
import { pipe } from 'fp-ts/lib/pipeable';
import * as  array from 'fp-ts/lib/Array'
export const wheres = parseToCompareCollectionModel(StoreWhereModel)
export const folderWhere: CompareModel<FolderWhere, Folder>[] = wheres.Folder
const folder: Folder = {
    name: 'abc',
    folders: [],
    files: [{
        path: '/a/a.txt',
        size: 30,
    }, {
        path: '/a/b.txt',
        size: 30,
    }, {
        path: '/a/b.bmp',
        size: 30,
    }]

}
describe('CompareModel', () => {
    it('basic', () => {
        const a: FolderWhere = {
            name: 'abc'
        }
        pipe(
            folderWhere,
            array.map(where => where(a)(folder)),
            array.compact,
            a => expect(a).toEqual([true])
        )
        pipe(
            folderWhere,
            array.map(where => where({ name_ends_with: 'c' })(folder)),
            array.compact,
            a => expect(a).toEqual([true])
        )
    })
    it('basic', () => {
        const a: FolderWhere = {
            files_every: {
                path_ends_with: 'txt'
            }
        }
        pipe(
            folderWhere,
            array.map(where => where(a)(folder)),
            array.compact,
            a => expect(a).toEqual([false])
        )
        pipe(
            folderWhere,
            array.map(where => where({ files_every: { size_lt: 50 } })(folder)),
            array.compact,
            a => expect(a).toEqual([true])
        )
    })

})


export const filter = (whereT: CompareModel<WhereInputModel<FolderWhere>, Folder>[]) =>
    (where: WhereInputModel<FolderWhere>) => (as: Folder[]): Folder[] =>
        as.filter(compareModel(whereT)(where))

export const compare = compareModel<FolderWhere, Folder>(folderWhere);
describe('compareModel', () => {
    it('compareModel with one props', () => {
        pipe(
            folder,
            compare({ name_ends_with: 'c', }),
            result => expect(result).toEqual(true)
        )
        pipe(
            folder,
            compare({ name_ends_with: 'c', }),
            result => expect(result).toEqual(true)
        )
        pipe(
            folder,
            compare({ files_some: { path: '/a/a.txt' }, }),
            result => expect(result).toEqual(true)
        )
        pipe(
            folder,
            compare({ files_some: { path: '/a/d/a.txt' }, }),
            result => expect(result).toEqual(false)
        )

    })
    it('compareModel with mutil props', () => {
        pipe(
            folder,
            compare({ name_ends_with: 'c', files_some: { path: '/a/a.txt' }, }),
            result => expect(result).toEqual(true)
        )
        pipe(
            folder,
            compare({ name_ends_with: 'c', files_some: { path: '/a/abc.txt' }, }),
            result => expect(result).toEqual(false)
        )
        pipe(
            folder,
            compare({ name_ends_with: 'E', files_some: { path: '/a/a.txt' }, }),
            result => expect(result).toEqual(false)
        )
    })

    /* const list: Person[] = [{
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
        expect(filter(wheres)({ NOT: { AND: {} }, OR: {}, AND: {} })(list).length).toEqual(list.length)
        expect(filter(wheres)({ NOT: [{ AND: {} }], OR: [{}], AND: [{}] })(list).length).toEqual(list.length)
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
        expect(filter(wheres)({ OR: { name_starts_with: 'jo', NOT: { female: true } } })(list).length).toEqual(2)
        expect(filter(wheres)({ OR: { OR: { city: 'beijing' }, female: true, } })(list).length).toEqual(2)
        expect(filter(wheres)({ OR: { name_starts_with: 'jo', NOT: { female: true } } })(list).length).toEqual(2)
    }) */
}) 