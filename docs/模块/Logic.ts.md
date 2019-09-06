---
title: Logic.ts
nav_order: 2
parent: 模块
---

# 概述

Logic

---

<h2 class="text-delta">目录</h2>

- [LogicCondition (类型)](#logiccondition-%E7%B1%BB%E5%9E%8B)
- [LogicConditions (常量)](#logicconditions-%E5%B8%B8%E9%87%8F)
- [LogicFold (常量)](#logicfold-%E5%B8%B8%E9%87%8F)

---

# LogicCondition (类型)

**签名**

```ts
export type LogicCondition = 'AND' | 'OR' | 'NOT'
```

v0.2.0 中添加

# LogicConditions (常量)

**签名**

```ts

export const LogicConditions: Array<'AND' | 'OR' | 'NOT'> = ...

```

v0.2.0 中添加

# LogicFold (常量)

逻辑比较

**签名**

```ts

export const LogicFold: Record<LogicCondition, (a: Array<Option<boolean>>) => Option<boolean>> = ...

```

v0.2.0 中添加
