import {
    CompareObjectModelDefinition
} from '../../Object';
export type Person = {
    name?:string,
    address?:string,
    age?:number,
    height?:number,
    female?:boolean,
    city?:'london'|'beijing'|'newyork',
    birthDay?:number,
}
export const personWhereModel: CompareObjectModelDefinition = {
    string: ['name', 'address'],
    number: ['age', 'height'],
    boolean: ['female'],
    enum: ['city'],
    date: ['birthDay']
}
export interface PersonWhere {
    name?:string
    name_in?:string[]
    name_not_in?:string[]
    name_starts_with?: string
    name_pattern?: string|string[]
    age?: number
    age_lt?:number
    age_lte?:number
    age_gt?:number
    age_gte?:number
    age_between?:{ low: number, hi: number }
    female?: boolean,
    female_not?:boolean,
    birthDay?: Date
    city_not?:string
    city?:string
    address_not?:string
    address?:string
    address_not_contains?:string
    address_contains?:string
    address_starts_with?:string
    address_not_starts_with?:string
    address_ends_with?:string
    address_not_ends_with?:string
    address_in?:string[]
    address_not_in?:string[]
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
