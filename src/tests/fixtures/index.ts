import {
    CompareModelFDefinition,WhereInputModel
} from '../../';
export type Person = {
    name?:string,
    address?:string,
    age?:number,
    height?:number,
    female?:boolean,
    city?:'london'|'beijing'|'newyork',
    city2?:'dalian'|'shanghai',
    created?:Date,
}

export type Where=WhereInputModel<PersonWhere>

export const personWhereModel: CompareModelFDefinition<Person, 'city', 'name' , 'age' , 'female', 'created'> = {
    string: ['name'],
    number: ['age'],
    boolean: ['female'],
    enum: ['city'],
    date: ['created']
}
export const personWhereAllModel: CompareModelFDefinition<Person, 'city'> = {
    string: ['name', 'address'],
    number: ['age', 'height'],
    boolean: ['female'],
    enum: ['city'],
    date: ['created']
}
export interface PersonWhere {
    name_starts_with?: string,
    name?:string,
    age?: number
    sex?: boolean
    birthDay?: Date
    female?:boolean
    city?:Person['city']
}
export const list: Person[] = [{
    name: 'taylor',
    age: 21,
    female: true,
    city: 'beijing',
}, {
    name: 'john',
    age: 35,
    female: false,
    city: 'london',
}]
