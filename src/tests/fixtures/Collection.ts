import {CompareModelDefinition} from '../../Collection'
export interface Folder {
    name: string,
    folders: Folder[]
    files: File[]
}
export interface File {
    path: string
    size: number
}

export const StoreWhereModel: CompareModelDefinition = {
    Folder: {
        string: ['name'],
        number: [],
        boolean: [],
        enum: [],
        date: [],
        type: [],
        types: [{
            name: 'folders',
            modelName: 'Folder',
            func: (a: Folder) => a.folders
        }, {
            name: 'files',
            modelName: 'File',
            func: (a: Folder) =>{
            
                return a;
            }
        }]
    },
    File: {
        string: ['path'],
        number: ['size'],
        boolean: [],
        enum: [],
        date: [],
        type: [],
        types: []
    },
}
export interface FileWhere{
    path?:string,
    path_ends_with?:string
    path_not_ends_with?:string,
    size_lt?:number
    size_lte?:number
}
export interface FolderWhere {
    name?:string
    name_in?:string[]
    name_not_in?:string[]
    name_starts_with?: string
    name_not?:string
    address_not_contains?:string
    address_contains?:string
    address_starts_with?:string
    address_not_starts_with?:string
    name_ends_with?:string
    name_not_ends_with?:string,
    files_every?:FileWhere
    files_some?:FileWhere

}
