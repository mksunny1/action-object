[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / splitOnce

# Function: splitOnce()

> **splitOnce**(`str`, `sep`): `string`[]

Split the input string at the first occurrence of the sep string.

## Parameters

• **str**: `string`

the string to split

• **sep**: `string`

the separator string

## Returns

`string`[]

an array comprising 1 or 2 elements depending on whether `sep` 
is present in `str`

## Example

```ts
import { splitOnce } from 'action-object'
splitOnce('a.b.c.d', '.');    // ['a', 'b.c.d']
```

## Defined in

[src/action-object.ts:27](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L27)
