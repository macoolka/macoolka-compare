---
title: Logic.ts
nav_order: 2
parent: Modules
---

# Overview

Logic

---

<h2 class="text-delta">Table of contents</h2>

- [LogicCondition (type alias)](#logiccondition-type-alias)
- [LogicConditions (constant)](#logicconditions-constant)
- [LogicFold (constant)](#logicfold-constant)

---

# LogicCondition (type alias)

**Signature**

```ts
export type LogicCondition = 'AND' | 'OR' | 'NOT'
```

Added in v0.2.0

# LogicConditions (constant)

**Signature**

```ts

export const LogicConditions: Array<'AND' | 'OR' | 'NOT'> = ...

```

Added in v0.2.0

# LogicFold (constant)

logic compare

**Signature**

```ts

export const LogicFold: Record<LogicCondition, (a: Array<Option<boolean>>) => Option<boolean>> = ...

```

Added in v0.2.0
