[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / callValue

# Function: callValue()

> **callValue**(`what`, ...`roots`): `any`

Calls the first method found in any of the given rrot at the path 
specified as or in `what`. This is not a reactive call but one to 
obtain a value.

## Parameters

• **what**: `string` \| [`ICallValueWhat`](../interfaces/ICallValueWhat.md)

either the method path or an `ICallValueWhat` which is an object 
with a `path` property and optional `args` property.

• ...**roots**: [`ActionObject`](../classes/ActionObject.md)[]

the action objects to search in order.

## Returns

`any`

## Example

```ts
import { ActionObject, getValue } from 'action-object'
const object = { a: 1, b: 2, c: 3, d: { e: { f: [88] } } }
const actionObject = new ActionObject(object);
callValue('d.e.f.pop', new ActionObject({}), actionObject);   // 88
```

## Defined in

[src/action-object.ts:609](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L609)
