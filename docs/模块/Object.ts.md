---
title: Object.ts
nav_order: 3
parent: 模块
---

# 概述

对象比较模型

---

<h2 class="text-delta">目录</h2>

- [CompareFunctions (类型)](#comparefunctions-%E7%B1%BB%E5%9E%8B)
- [CompareModel (类型)](#comparemodel-%E7%B1%BB%E5%9E%8B)
- [CompareModelStruct (类型)](#comparemodelstruct-%E7%B1%BB%E5%9E%8B)
- [CompareObjectModelDefinition (类型)](#compareobjectmodeldefinition-%E7%B1%BB%E5%9E%8B)
- [PredicateOption (类型)](#predicateoption-%E7%B1%BB%E5%9E%8B)
- [WhereCompareModel (类型)](#wherecomparemodel-%E7%B1%BB%E5%9E%8B)
- [WhereCompareModelT (类型)](#wherecomparemodelt-%E7%B1%BB%E5%9E%8B)
- [WhereInputModel (类型)](#whereinputmodel-%E7%B1%BB%E5%9E%8B)
- [WhereInputModel1 (类型)](#whereinputmodel1-%E7%B1%BB%E5%9E%8B)
- [compareModel (函数)](#comparemodel-%E5%87%BD%E6%95%B0)
- [getCompare (函数)](#getcompare-%E5%87%BD%E6%95%B0)
- [getWherePropsName (函数)](#getwherepropsname-%E5%87%BD%E6%95%B0)
- [parseToCompareModel (函数)](#parsetocomparemodel-%E5%87%BD%E6%95%B0)
- [parseToWherePropName (函数)](#parsetowherepropname-%E5%87%BD%E6%95%B0)

---

# CompareFunctions (类型)

比较函数集合

由名称和函数组成

**签名**

```ts
export type CompareFunctions = {
  [k: string]: Compare<any, any>
}
```

v0.2.0 中添加

# CompareModel (类型)

比较模型

比较 WhereInputModel 和 Model

**签名**

```ts
export type CompareModel<
  W extends Record<string, any> = Record<string, any>,
  T extends Record<string, any> = Record<string, any>
> = (where: WhereInputModel<W>) => PredicateOption<T>
```

**示例**

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

v0.2.0 中添加

# CompareModelStruct (类型)

CompareModel Group by type

**签名**

```ts
export type CompareModelStruct = Record<string, CompareModel>
```

v0.2.0 中添加

# CompareObjectModelDefinition (类型)

比较模型定义

**签名**

```ts
export type CompareObjectModelDefinition = {
  string: Array<string>
  number: Array<string>
  boolean: Array<string>
  enum: Array<string>
  date: Array<string>
}
```

v0.2.0 中添加

# PredicateOption (类型)

**签名**

```ts
export type PredicateOption<T> = (a: T) => O.Option<boolean>
```

v0.2.0 中添加

# WhereCompareModel (类型)

**签名**

```ts
export type WhereCompareModel<
  W extends Record<string, any> = Record<string, any>,
  T extends Record<string, any> = Record<string, any>
> = Compare<WhereInputModel<W>, T>
```

v0.2.0 中添加

# WhereCompareModelT (类型)

**签名**

```ts
export type WhereCompareModelT<
  W extends Record<string, any> = Record<string, any>,
  T extends Record<string, any> = Record<string, any>
> = Compare<WhereInputModel<W>, T>
```

v0.2.0 中添加

# WhereInputModel (类型)

**签名**

```ts
export type WhereInputModel<T> = T & {
  AND?: Array<T> | T
  OR?: Array<T> | T
  NOT?: Array<T> | T
}
```

v0.2.0 中添加

# WhereInputModel1 (类型)

**签名**

```ts
export type WhereInputModel1<T> = T & {
  AND?: Array<WhereInputModel<T>> | WhereInputModel<T>
  OR?: Array<WhereInputModel<T>> | WhereInputModel<T>
  NOT?: Array<WhereInputModel<T>> | WhereInputModel<T>
}
```

v0.2.0 中添加

# compareModel (函数)

compare WhereInputModel and Model with CompareModel

**签名**

```ts

export const compareModel =
    <
        W extends Record<string, any> = Record<string, any>,
        T extends Record<string, any> = Record<string, any>
    >
        (whereT: CompareModel<W, T>[]): WhereCompareModel<W, T> => (where: WhereInputModel<W>) => ...

```

v0.2.0 中添加

# getCompare (函数)

使用比较函数集合和模型属性名数组生成比较模型

**签名**

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

v0.2.0 中添加

# getWherePropsName (函数)

**签名**

```ts

export const getWherePropsName = (name: string) => (condition: string) => ...

```

v0.2.0 中添加

# parseToCompareModel (函数)

**签名**

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

v0.2.0 中添加

# parseToWherePropName (函数)

create a where's propery name

**签名**

```ts

export const parseToWherePropName = (modelWhere: CompareObjectModelDefinition) =>
    pipe(
        modelWhere,
        R.mapWithIndex((key, value: any) => ...

```

v0.2.0 中添加
