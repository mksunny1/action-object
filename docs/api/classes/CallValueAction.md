[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / CallValueAction

# Class: CallValueAction

An action that uses [callValue](../functions/callValue.md) to obtain a value from calling 
the method at the path in the given roots and sets it as the context 
value before invoking nested actions.

## Example

```ts
import { ActionObject, CallValueAction } from 'action-object'
const object = { a: 1, b: 2, c: 3, d: { e: { f: [88] } } }
const valueAction = new CallValueAction('d.e.f.pop', [new ActionObject(object)]);
const context = {}
valueAction.act(context);   // context.value === 88
```

## Extends

- [`ValueAction`](ValueAction.md)\<`string` \| [`ICallValueWhat`](../interfaces/ICallValueWhat.md)\>

## Constructors

### new CallValueAction()

> **new CallValueAction**(`path`, `roots`, ...`reactions`): [`CallValueAction`](CallValueAction.md)

#### Parameters

• **path**: `string` \| [`ICallValueWhat`](../interfaces/ICallValueWhat.md)

• **roots**: [`ActionObject`](ActionObject.md)[]

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

[`CallValueAction`](CallValueAction.md)

#### Inherited from

[`ValueAction`](ValueAction.md).[`constructor`](ValueAction.md#constructors)

#### Defined in

[src/action-object.ts:622](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L622)

## Properties

### keyedReactions?

> `optional` **keyedReactions**: `object`

#### Index Signature

 \[`key`: `IKey`\]: `ClassAction`\<`any`\>[]

#### Inherited from

[`ValueAction`](ValueAction.md).[`keyedReactions`](ValueAction.md#keyedreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:57](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L57)

***

### path

> **path**: `string` \| [`ICallValueWhat`](../interfaces/ICallValueWhat.md)

#### Inherited from

[`ValueAction`](ValueAction.md).[`path`](ValueAction.md#path)

#### Defined in

[src/action-object.ts:620](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L620)

***

### reactions?

> `optional` **reactions**: `ClassAction`\<`any`\>[]

Instance reactions. These are reactions added to every class-action
instance. They may be necessary when they require internal state that
differ between instances.

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`reactions`](ValueAction.md#reactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:56](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L56)

***

### roots

> **roots**: [`ActionObject`](ActionObject.md)[]

#### Inherited from

[`ValueAction`](ValueAction.md).[`roots`](ValueAction.md#roots)

#### Defined in

[src/action-object.ts:621](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L621)

***

### reactions

> `static` **reactions**: `ClassAction`\<`any`\>[]

Static reactions. These will be associated with all class-action
instances created with the same class without being present on
every instance. In most cases, such actions should be stateless,
though you may deliberately want to share state in some scenarios.

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
const myClassAction1 = new MyClassAction();
const myClassAction2 = new MyClassAction();
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`reactions`](ValueAction.md#reactions-1)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:44](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L44)

## Methods

### act()

> **act**(`context`?): `any`

Performs the local action and triggers all reactions.

#### Parameters

• **context?**: `any`

#### Returns

`any`

#### Example

```ts
import { ClassAction } from 'class-action'
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log(context.msg);
   }
}
const myClassAction = new MyClassAction(new MyClassAction(), new MyClassAction());
myClassAction.act({ msg: 'nice work' });
// prints 'nice work' thrice...
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`act`](ValueAction.md#act)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:134](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L134)

***

### addKeyedReactions()

> **addKeyedReactions**(`reactionKey`, ...`reactions`): `void`

Adds the given reactions to the list of reactions with the key.

#### Parameters

• **reactionKey**: `IKey`

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Inherited from

[`ValueAction`](ValueAction.md).[`addKeyedReactions`](ValueAction.md#addkeyedreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:194](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L194)

***

### addReactions()

> **addReactions**(...`reactions`): `void`

Adds the given reactions to this ClassAction. This allows for
more implementation flexibility in derived classes.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log('Added reaction');
   }
}
myClassAction.addReactions(new MyClassAction())
myClassAction.act()
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`addReactions`](ValueAction.md#addreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:187](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L187)

***

### doAction()

> **doAction**(`context`?): `void`

Performs the local action

#### Parameters

• **context?**: `any`

#### Returns

`void`

#### Example

```ts
import { ClassAction } from 'class-action'
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log(context.msg);
   }
}
const myClassAction = new MyClassAction(new MyClassAction(), new MyClassAction());
myClassAction.doAction({ msg: 'nice work' });
// prints 'nice work' once...
```

#### Overrides

[`ValueAction`](ValueAction.md).[`doAction`](ValueAction.md#doaction)

#### Defined in

[src/action-object.ts:663](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/src/action-object.ts#L663)

***

### doReactions()

> **doReactions**(`context`?): `any`

Triggers all reactions of this ClassAction

#### Parameters

• **context?**: `any`

#### Returns

`any`

#### Example

```ts
import { ClassAction } from 'class-action'
class MyClassAction extends ClassAction {
   doAction(context) {
     console.log(context.msg);
   }
}
const myClassAction = new MyClassAction(new MyClassAction(), new MyClassAction());
myClassAction.doReactions({ msg: 'nice work' });
// prints 'nice work' twice...
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`doReactions`](ValueAction.md#doreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:168](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L168)

***

### getAllReactions()

> **getAllReactions**(`context`?): `Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

Gets all class and instance reactions. This is used internally
to obtain all reactions to trigger after the local action has
been executed.

#### Parameters

• **context?**: `any`

#### Returns

`Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
const myClassAction = new MyClassAction(reaction1, reaction2);
myClassAction.getAllReactions();
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`getAllReactions`](ValueAction.md#getallreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:118](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L118)

***

### getReactions()

> **getReactions**(`context`?): `Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

Returns all instance reactions of this ClassAction.
By default it simply returns [ClassAction#reactions](ObjectPropAction.md#reactions).

#### Parameters

• **context?**: `any`

#### Returns

`Generator`\<`ClassAction`\<`any`\>, `void`, `unknown`\>

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.getReactions();
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`getReactions`](ValueAction.md#getreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:100](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L100)

***

### removeKeyedReactions()

> **removeKeyedReactions**(...`reactionKeys`): `void`

Removes the reactions with the specified keys.

#### Parameters

• ...**reactionKeys**: `IKey`[]

#### Returns

`void`

#### Inherited from

[`ValueAction`](ValueAction.md).[`removeKeyedReactions`](ValueAction.md#removekeyedreactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:213](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L213)

***

### removeReactions()

> **removeReactions**(...`reactions`): `void`

Removes the specified reactions.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.removeReactions(reaction2);
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`removeReactions`](ValueAction.md#removereactions)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:206](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L206)

***

### getReactions()

> `static` **getReactions**\<`T`\>(`context`?): `ClassAction`\<`any`\>[]

This is the method called by instances to obtain the static reactions.
It enables a more dynamic way of overriding static reactions in a
derived class.
By default it simply returns [ClassAction.reactions](ObjectPropAction.md#reactions-1).

#### Type Parameters

• **T**

#### Parameters

• **context?**: `T`

#### Returns

`ClassAction`\<`any`\>[]

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
MyClassAction.getReactions();
```

#### Inherited from

[`ValueAction`](ValueAction.md).[`getReactions`](ValueAction.md#getreactions-1)

#### Defined in

[node\_modules/class-action/dist/class-action.d.ts:86](https://github.com/mksunny1/action-object/blob/c0bfb5553eaceeaf077143b5e92f03bc4b891b33/node_modules/class-action/dist/class-action.d.ts#L86)
