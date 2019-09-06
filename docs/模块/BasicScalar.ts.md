---
title: BasicScalar.ts
nav_order: 1
parent: 模块
---

# 概述

基本类型比较函数

---

<h2 class="text-delta">目录</h2>

- [Compare (接口)](#compare-%E6%8E%A5%E5%8F%A3)
- [BasicCompareType (类型)](#basiccomparetype-%E7%B1%BB%E5%9E%8B)
- [CompareBoolean (类型)](#compareboolean-%E7%B1%BB%E5%9E%8B)
- [CompareEnum (类型)](#compareenum-%E7%B1%BB%E5%9E%8B)
- [CompareNumber (类型)](#comparenumber-%E7%B1%BB%E5%9E%8B)
- [CompareString (类型)](#comparestring-%E7%B1%BB%E5%9E%8B)
- [GetFirstParam (类型)](#getfirstparam-%E7%B1%BB%E5%9E%8B)
- [BasicConditionNames (常量)](#basicconditionnames-%E5%B8%B8%E9%87%8F)
- [compare (常量)](#compare-%E5%B8%B8%E9%87%8F)
- [compareBoolean (常量)](#compareboolean-%E5%B8%B8%E9%87%8F)
- [compareDate (常量)](#comparedate-%E5%B8%B8%E9%87%8F)
- [compareEnum (常量)](#compareenum-%E5%B8%B8%E9%87%8F)
- [compareNumber (常量)](#comparenumber-%E5%B8%B8%E9%87%8F)
- [compareString (常量)](#comparestring-%E5%B8%B8%E9%87%8F)
- [fromEq (函数)](#fromeq-%E5%87%BD%E6%95%B0)
- [fromOrd (函数)](#fromord-%E5%87%BD%E6%95%B0)

---

# Compare (接口)

比较两个对象是否相等

**签名**

```ts
interface Compare {}
```

v0.2.0 中添加

# BasicCompareType (类型)

基本的比较类型

**签名**

```ts
export type BasicCompareType = 'string' | 'number' | 'boolean' | 'date' | 'enum'
```

v0.2.0 中添加

# CompareBoolean (类型)

布尔类型比较函数接口

**签名**

```ts
export type CompareBoolean<A = boolean> = {
  eq: Compare<A, A>
  not: Compare<A, A>
}
```

v0.2.0 中添加

# CompareEnum (类型)

枚举型比较接口

**签名**

```ts
export type CompareEnum<A> = CompareBoolean<A> & {
  in: Compare<A[], A>
  not_in: Compare<A[], A>
}
```

v0.2.0 中添加

# CompareNumber (类型)

数值型比较接口

**签名**

```ts
export type CompareNumber<A = number> = CompareBoolean<A> & {
  lt: Compare<A, A>
  gt: Compare<A, A>
  lte: Compare<A, A>
  gte: Compare<A, A>
  between: Compare<{ low: A; hi: A }, A>
}
```

v0.2.0 中添加

# CompareString (类型)

字符型比较接口

**签名**

```ts
export type CompareString<A extends string = string> = CompareNumber<A> & {
  not_contains: Compare<A, A>
  not_starts_with: Compare<A, A>
  not_ends_with: Compare<A, A>
  not_in: Compare<A[], A>
  starts_with: Compare<A, A>
  ends_with: Compare<A, A>
  contains: Compare<A, A>
  in: Compare<A[], A>
  pattern: Compare<A[] | A, A>
}
```

v0.2.0 中添加

# GetFirstParam (类型)

获得比较函数的第一个参数类型

**签名**

```ts
export type GetFirstParam<T> = T extends Compare<infer U, any> ? U : never
```

**示例**

```ts
import { GetFirstParam } from 'macoolka-compare'
type Fisrt = GetFirstParam<(a: number) => (b: string) => boolean>
//First = number
```

v0.2.0 中添加

# BasicConditionNames (常量)

所有的函数名称

**签名**

```ts

export const BasicConditionNames: { string: string[]; number: string[]; boolean: string[]; enum: string[]; date: string[]; } = ...

```

v0.2.0 中添加

# compare (常量)

所有支持的比较函数，按类型拆分

**签名**

```ts

export const compare: { string: CompareString<any>; number: CompareNumber<any>; boolean: CompareBoolean<any>; date: CompareNumber<Date>; enum: CompareEnum<string>; } = ...

```

v0.2.0 中添加

# compareBoolean (常量)

BooleanCompare 实例

**签名**

```ts

export const compareBoolean: CompareBoolean<any> = ...

```

v0.2.0 中添加

# compareDate (常量)

日期型比较实例

**签名**

```ts

export const compareDate: CompareNumber<Date> = ...

```

v0.2.0 中添加

# compareEnum (常量)

`CompareEnum`实例

**签名**

```ts

export const compareEnum: CompareEnum<string> = ...

```

v0.2.0 中添加

# compareNumber (常量)

`CompareNumber`实例

**签名**

```ts

export const compareNumber: CompareNumber<any> = ...

```

v0.2.0 中添加

# compareString (常量)

`CompareString` 实例

**签名**

```ts

export const compareString: CompareString<any> = ...

```

v0.2.0 中添加

# fromEq (函数)

从`Eq`转化到布尔比较函数接口

v0.2.0 中添加

# fromOrd (函数)

转换`Ord`到`CompareNumber`实例

v0.2.0 中添加
