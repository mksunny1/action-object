[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / ActionObject

# Class: ActionObject

An object wrapper that uses class-actions for setting and deleting 
properties and calling methods.

## Constructors

### new ActionObject()

> **new ActionObject**(`object`): [`ActionObject`](ActionObject.md)

Initializes a new action object on the given object.

#### Parameters

• **object**: `any`

#### Returns

[`ActionObject`](ActionObject.md)

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: 3 }
const actionObject = new ActionObject(object);
```

#### Defined in

[src/action-object.ts:121](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L121)

## Properties

### callActions?

> `optional` **callActions**: [`IMap`](../type-aliases/IMap.md)\<`ClassAction`\<[`IObjectCallActionContext`](../interfaces/IObjectCallActionContext.md)\>\>

Object containing the class actions for the reactive methods 
of the object wrapped by this action object.

#### Defined in

[src/action-object.ts:229](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L229)

***

### children?

> `optional` **children**: [`IMap`](../type-aliases/IMap.md)\<[`ActionObject`](ActionObject.md)\> \| [`ActionObject`](ActionObject.md)[]

Action objects that wrap reactive object type properties of the 
object wrapped by this class action.

#### Defined in

[src/action-object.ts:109](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L109)

***

### object

> **object**: `any`

The wrapped object

#### Defined in

[src/action-object.ts:103](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L103)

***

### setActions?

> `optional` **setActions**: [`IMap`](../type-aliases/IMap.md)\<`ClassAction`\<[`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)\>\>

Object containing the class actions for the reactive properties 
of the object wrapped by this action object.

#### Defined in

[src/action-object.ts:143](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L143)

***

### pathSep

> `static` **pathSep**: `string` = `'.'`

The string for separating property keys in nested paths.

#### Defined in

[src/action-object.ts:98](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L98)

## Methods

### act()

> **act**(): `void`

This is called simply to trigger all actions within this action 
object with existing values in the wrapped object.

#### Returns

`void`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: 3 }
const actionObject = new ActionObject(object);
let count = 0;
const actions = [ { act() { count++; } } ];
actionObject.addActions('a', actions, 'set');
actionObject.addActions('b', actions, 'set');
actionObject.act();    // count === 2
```

#### Defined in

[src/action-object.ts:137](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L137)

***

### addActions()

> **addActions**(`path`, `actions`, `type`, `reactionKey`?): `any`

Adds the given actions at the path. The actions are either added to 
the `setActions` or `callActions` object property of this action object 
or a child action object, respectively depending on the specified type 
and path.

#### Parameters

• **path**: `string`

• **actions**: `ClassAction`\<`any`\>[]

• **type**: `"set"` \| `"call"`

• **reactionKey?**: [`IKey`](../type-aliases/IKey.md)

#### Returns

`any`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: 3 }
const actionObject = new ActionObject(object);
let count = 0;
const actions = [ { act(context) { count += context.value; } } ];
actionObject.addActions('a', actions, 'set');
const proxy = actionObject.createProxy();
proxy.a = 25;      // object.a === 25 && count === 25
```

#### Defined in

[src/action-object.ts:462](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L462)

***

### call()

> **call**(`method`, ...`args`): `void`

Reactively invokes the method with any given args. The method is 
first called and its return value is added to the class action 
context passed to the linked class actions.

#### Parameters

• **method**: [`IKey`](../type-aliases/IKey.md)

• ...**args**: `any`[]

#### Returns

`void`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = [1, 2, 3]
const actionObject = new ActionObject(object);
let count = 0;
const actions = [ { act(context) { count = context.args?.length; } } ];
actionObject.addActions('push', actions, 'call');
actionObject.call('push', 4, 5, 6, 7);
// object === [1, 2, 3, 4, 5, 6, 7] && count === 4;
```

#### Defined in

[src/action-object.ts:250](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L250)

***

### callValue()

> **callValue**(`path`, ...`args`): `any`

Calls the method at the path within the wrapped object 
(without reactivity). The call is performed only to obtain its 
return value.

#### Parameters

• **path**: `string`

• ...**args**: `any`[]

#### Returns

`any`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: { d: [3, 4] } }
const actionObject = new ActionObject(object);
actionObject.callValue('c.d.pop');    // 4
```

#### Defined in

[src/action-object.ts:336](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L336)

***

### createProxy()

> **createProxy**(): [`ActionObject`](ActionObject.md)

Returns a wrapper that can be used like the original object to 
perform set and call operations reactively.

#### Returns

[`ActionObject`](ActionObject.md)

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: 3 }
const actionObject = new ActionObject(object);
let count = 0;
const actions = [ { act(context) { count += context.value; } } ];
actionObject.addActions('a', actions, 'set');
const proxy = actionObject.createProxy();
proxy.a = 25;      // object.a === 25 && count === 25
```

#### Defined in

[src/action-object.ts:274](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L274)

***

### delete()

> **delete**(...`keys`): `void`

Removes all object properties, actions and children associated 
with the object property keys. 

This is a non-reactive cleanup operation. It can be called on its 
own if the associated actions have already become irrelevant (perhaps 
after calling `set` with `undefined` or disconnecting bound elements 
'from outside')...

#### Parameters

• ...**keys**: [`IKey`](../type-aliases/IKey.md)[]

#### Returns

`void`

#### Example

```ts

```

#### Defined in

[src/action-object.ts:538](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L538)

***

### doSet()

> **doSet**(`key`, `value`): `void`

Call this method to explicitly set a property and trigger actions.
No special handling of the empty string key here unlike in `set`.

#### Parameters

• **key**: [`IKey`](../type-aliases/IKey.md)

• **value**: `any`

#### Returns

`void`

#### Example

```ts

```

#### Defined in

[src/action-object.ts:155](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L155)

***

### ensureChild()

> **ensureChild**(`key`): `void`

If the key does not yet exist in `this.children`, this method 
initializes an action object for the property with the key and 
adds it to `this.children`.

#### Parameters

• **key**: `string`

#### Returns

`void`

#### Defined in

[src/action-object.ts:367](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L367)

***

### ensureChildren()

> **ensureChildren**(): `void`

Initializes `this.children` if it is not yet initialized.
If the wrapped object is an array, `this.children` is initialized 
to an array; else it is initialized to an object.

#### Returns

`void`

#### Defined in

[src/action-object.ts:355](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L355)

***

### getChild()

> **getChild**(`path`, `forceChild`): `any`

Returns the child action object at the given path.
If the child does not yet exist, it will be created and returned if 
`forceChild` is truthy.

#### Parameters

• **path**: `string`

• **forceChild**: `boolean` = `false`

#### Returns

`any`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: { d: [3, 4] } }
const actionObject = new ActionObject(object);
actionObject.getChild('c.d');          // undefined
actionObject.getChild('c.d', true);    // ActionObject { object: [3, 4] }
```

#### Defined in

[src/action-object.ts:392](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L392)

***

### getValue()

> **getValue**(`path`): `any`

Returns the value at the path within the wrapped object.

#### Parameters

• **path**: `string`

#### Returns

`any`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: { d: 3 } }
const actionObject = new ActionObject(object);
actionObject.getValue('c.d');    // 3
```

#### Defined in

[src/action-object.ts:308](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L308)

***

### has()

> **has**(`path`): `boolean`

Returns `true` if the property at the path eists in the wrapped 
object; otherwise returns `false`.

#### Parameters

• **path**: `string`

#### Returns

`boolean`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: { d: 3 } }
const actionObject = new ActionObject(object);
actionObject.has('c');    // true
actionObject.has('c.d');  // true
actionObject.has('d');    // false
```

#### Defined in

[src/action-object.ts:291](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L291)

***

### merge()

> **merge**(...`actionObjects`): `void`

Merges the content of the other action objects into this one.

#### Parameters

• ...**actionObjects**: [`ActionObject`](ActionObject.md)[]

#### Returns

`void`

#### Example

```ts

```

#### Defined in

[src/action-object.ts:412](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L412)

***

### removeActions()

> **removeActions**(...`reactionKeys`): `void`

Removes all actions (and nested actions) added with the specified 
reaction keys. Reaction keys refer to keys used with keyedReactions 
in {@module:class-action} and not to keys associated with 
the object wrapped by this ActionObject.

This is a cleanup operation for removing 'scoped actions'
within a large ActionObject, perhaps before adding another set of 
scoped actions with the same keys. 

One practical use-case for scoped actions is condition rendering as 
as implemented in {@module:active-component}.

#### Parameters

• ...**reactionKeys**: [`IKey`](../type-aliases/IKey.md)[]

#### Returns

`void`

#### Example

```ts

```

#### Defined in

[src/action-object.ts:503](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L503)

***

### set()

> **set**(`key`, `value`): `void`

Assigns the value to the property with the key and trigger 
actions (and nested actions) bound to the key. The special 
empty string key refers to the object wrapped by this class 
action. When we set it to a new value, all the actions contained 
within this action object will be triggered.

#### Parameters

• **key**: [`IKey`](../type-aliases/IKey.md)

• **value**: `any`

#### Returns

`void`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: 3 }
const actionObject = new ActionObject(object);
let count = 0;
const actions = [ { act(context) { count += context.value; } } ];
actionObject.addActions('a', actions, 'set');
actionObject.set('a', 25);  // object.a === 25 && count === 25
```

#### Defined in

[src/action-object.ts:183](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L183)

***

### setAll()

> **setAll**(`all`): `void`

Reactively sets multiple properties at the same time.

#### Parameters

• **all**: [`IMap`](../type-aliases/IMap.md)\<`any`\>

#### Returns

`void`

#### Example

```ts
import { ActionObject } from 'action-object'
const object = { a: 1, b: 2, c: 3 }
const actionObject = new ActionObject(object);
let count = 0;
const actions = [ { act(context) { count += context.value; } } ];
actionObject.addActions('a', actions, 'set');
actionObject.setAll({ a: 25, b: 50 });  
// object.a === 25 && object.b === 50 && count === 25
```

#### Defined in

[src/action-object.ts:219](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L219)
