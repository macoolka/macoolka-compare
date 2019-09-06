---
title: BasicScalar.ts
nav_order: 1
parent: Modules
---

# Overview

Basic Type Compare

---

<h2 class="text-delta">Table of contents</h2>

- [Compare (interface)](#compare-interface)
- [BasicCompareType (type alias)](#basiccomparetype-type-alias)
- [CompareBoolean (type alias)](#compareboolean-type-alias)
- [CompareEnum (type alias)](#compareenum-type-alias)
- [CompareNumber (type alias)](#comparenumber-type-alias)
- [CompareString (type alias)](#comparestring-type-alias)
- [GetFirstParam (type alias)](#getfirstparam-type-alias)
- [BasicConditionNames (constant)](#basicconditionnames-constant)
- [compare (constant)](#compare-constant)
- [compareBoolean (constant)](#compareboolean-constant)
- [compareDate (constant)](#comparedate-constant)
- [compareEnum (constant)](#compareenum-constant)
- [compareNumber (constant)](#comparenumber-constant)
- [compareString (constant)](#comparestring-constant)
- [fromEq (function)](#fromeq-function)
- [fromOrd (function)](#fromord-function)

---

# Compare (interface)

Compare two object is equal.

**Signature**

```ts
interface Compare {}
```

Added in v0.2.0

# BasicCompareType (type alias)

Baisc compare type

**Signature**

```ts
export type BasicCompareType = 'string' | 'number' | 'boolean' | 'date' | 'enum'
```

Added in v0.2.0

# CompareBoolean (type alias)

Boolean compare interface

**Signature**

```ts
export type CompareBoolean<A = boolean> = {
  eq: Compare<A, A>
  not: Compare<A, A>
}
```

Added in v0.2.0

# CompareEnum (type alias)

Enum compare interface

**Signature**

```ts
export type CompareEnum<A> = CompareBoolean<A> & {
  in: Compare<A[], A>
  not_in: Compare<A[], A>
}
```

Added in v0.2.0

# CompareNumber (type alias)

Number compare interface

**Signature**

```ts
export type CompareNumber<A = number> = CompareBoolean<A> & {
  lt: Compare<A, A>
  gt: Compare<A, A>
  lte: Compare<A, A>
  gte: Compare<A, A>
  between: Compare<{ low: A; hi: A }, A>
}
```

Added in v0.2.0

# CompareString (type alias)

String compare interface

**Signature**

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

Added in v0.2.0

# GetFirstParam (type alias)

Get first param type with `Compare`

**Signature**

```ts
export type GetFirstParam<T> = T extends Compare<infer U, any> ? U : never
```

**Example**

```ts
import { GetFirstParam } from 'macoolka-compare'
type Fisrt = GetFirstParam<(a: number) => (b: string) => boolean>
//First = number
```

Added in v0.2.0

# BasicConditionNames (constant)

The contain all compare function name by type

**Signature**

```ts

export const BasicConditionNames: { string: string[]; number: string[]; boolean: string[]; enum: string[]; date: string[]; } = ...

```

Added in v0.2.0

# compare (constant)

The contain all compare function by type

**Signature**

```ts

export const compare: { string: CompareString<any>; number: CompareNumber<any>; boolean: CompareBoolean<any>; date: CompareNumber<Date>; enum: CompareEnum<string>; } = ...

```

Added in v0.2.0

# compareBoolean (constant)

BooleanCompare instance

**Signature**

```ts

export const compareBoolean: CompareBoolean<any> = ...

```

Added in v0.2.0

# compareDate (constant)

Date compare instance

**Signature**

```ts

export const compareDate: CompareNumber<Date> = ...

```

Added in v0.2.0

# compareEnum (constant)

`CompareEnum` instance

**Signature**

```ts

export const compareEnum: CompareEnum<string> = ...

```

Added in v0.2.0

# compareNumber (constant)

`CompareNumber` instance

**Signature**

```ts

export const compareNumber: CompareNumber<any> = ...

```

Added in v0.2.0

# compareString (constant)

`CompareString` instance

**Signature**

```ts

export const compareString: CompareString<any> = ...

```

Added in v0.2.0

# fromEq (function)

From `Eq` to CompareBoolean instance

Added in v0.2.0

# fromOrd (function)

From `Ord` to `CompareNumber` Instance

Added in v0.2.0
