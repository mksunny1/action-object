[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / getValue

# Function: getValue()

> **getValue**(`path`, ...`roots`): `any`

Returns the value from the first root that wraps an object which contains  
a value at the specified path.

## Parameters

• **path**: `string`

• ...**roots**: [`ActionObject`](../classes/ActionObject.md)[]

## Returns

`any`

## Example

```ts
import { ActionObject, getValue } from 'action-object'
const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
const actionObject = new ActionObject(object);
getValue('d.e.f', new ActionObject({}), actionObject);   // 88
```

## Defined in

[src/action-object.ts:578](https://github.com/mksunny1/action-object/blob/2f994729170d9fd3715cf0f4d8ea6de29c244fed/src/action-object.ts#L578)
