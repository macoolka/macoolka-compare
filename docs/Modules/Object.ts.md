---
title: Object.ts
nav_order: 3
parent: Modules
---

# Overview

Object Compare Model

---

<h2 class="text-delta">Table of contents</h2>

- [CompareFunctions (type alias)](#comparefunctions-type-alias)
- [CompareModel (type alias)](#comparemodel-type-alias)
- [CompareModelStruct (type alias)](#comparemodelstruct-type-alias)
- [CompareObjectModelDefinition (type alias)](#compareobjectmodeldefinition-type-alias)
- [PredicateOption (type alias)](#predicateoption-type-alias)
- [WhereCompareModel (type alias)](#wherecomparemodel-type-alias)
- [WhereCompareModelT (type alias)](#wherecomparemodelt-type-alias)
- [WhereInputModel (type alias)](#whereinputmodel-type-alias)
- [WhereInputModel1 (type alias)](#whereinputmodel1-type-alias)
- [compareModel (function)](#comparemodel-function)
- [getCompare (function)](#getcompare-function)
- [getWherePropsName (function)](#getwherepropsname-function)
- [parseToCompareModel (function)](#parsetocomparemodel-function)
- [parseToWherePropName (function)](#parsetowherepropname-function)

---

# CompareFunctions (type alias)

Compare functions Struct

consist of name and function

**Signature**

```ts
export type CompareFunctions = {
  [k: string]: Compare<any, any>
}
```

Added in v0.2.0

# CompareModel (type alias)

Compare Model that compare WhereInputModel and Model

**Signature**

```ts
export type CompareModel<
  W extends Record<string, any> = Record<string, any>,
  T extends Record<string, any> = Record<string, any>
> = (where: WhereInputModel<W>) => PredicateOption<T>
```

**Example**

```ts

WhereInputModel:

{
   name_starts_with:'刘',
   age_lt: 34
}

Model
{
  name:'刘兴',
  age:30
}

```

Added in v0.2.0

# CompareModelStruct (type alias)

CompareModel Group by type

**Signature**

```ts
export type CompareModelStruct = Record<string, CompareModel>
```

Added in v0.2.0

# CompareObjectModelDefinition (type alias)

Define a Compare Object Model

**Signature**

```ts
export type CompareObjectModelDefinition = {
  string: Array<string>
  number: Array<string>
  boolean: Array<string>
  enum: Array<string>
  date: Array<string>
}
```

Added in v0.2.0

# PredicateOption (type alias)

**Signature**

```ts
export type PredicateOption<T> = (a: T) => O.Option<boolean>
```

Added in v0.2.0

# WhereCompareModel (type alias)

**Signature**

```ts
export type WhereCompareModel<
  W extends Record<string, any> = Record<string, any>,
  T extends Record<string, any> = Record<string, any>
> = Compare<WhereInputModel<W>, T>
```

Added in v0.2.0

# WhereCompareModelT (type alias)

**Signature**

```ts
export type WhereCompareModelT<
  W extends Record<string, any> = Record<string, any>,
  T extends Record<string, any> = Record<string, any>
> = Compare<WhereInputModel<W>, T>
```

Added in v0.2.0

# WhereInputModel (type alias)

**Signature**

```ts
export type WhereInputModel<T> = T & {
  AND?: Array<T> | T
  OR?: Array<T> | T
  NOT?: Array<T> | T
}
```

Added in v0.2.0

# WhereInputModel1 (type alias)

**Signature**

```ts
export type WhereInputModel1<T> = T & {
  AND?: Array<WhereInputModel<T>> | WhereInputModel<T>
  OR?: Array<WhereInputModel<T>> | WhereInputModel<T>
  NOT?: Array<WhereInputModel<T>> | WhereInputModel<T>
}
```

Added in v0.2.0

# compareModel (function)

compare WhereInputModel and Model with CompareModel

**Signature**

```ts

export const compareModel =
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >
        (whereT: CompareModel<W, T>[]): WhereCompareModel<W, T> => (where: WhereInputModel<W>) => ...

```

Added in v0.2.0

# getCompare (function)

build Compare Model with CompareFunctions and prop name

**Signature**

```ts

export const getCompare = (as: CompareFunctions) =>
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >
        (propname: string[]):
        CompareModel<W, T>[] => pipe(
            propname,
            A.map(name =>
                pipe(
                    R.toArray(as),
                    A.map(([key, value]) => ...

```

Added in v0.2.0

# getWherePropsName (function)

**Signature**

```ts

export const getWherePropsName = (name: string) => (condition: string) => ...

```

Added in v0.2.0

# parseToCompareModel (function)

**Signature**

```ts

export const parseToCompareModel =
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >

        (modelWhere: CompareObjectModelDefinition): CompareModel<W, T>[] =>
        pipe(
            modelWhere,
            R.mapWithIndex((key, value) => ...

```

Added in v0.2.0

# parseToWherePropName (function)

create a where's propery name

**Signature**

```ts

export const parseToWherePropName = (modelWhere: CompareObjectModelDefinition) =>
    pipe(
        modelWhere,
        R.mapWithIndex((key, value: any) => ...

```

Added in v0.2.0
