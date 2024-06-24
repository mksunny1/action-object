[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / GetValueAction

# Class: GetValueAction

An action that uses [getValue](../functions/getValue.md) to obtain a value at the path 
from the given roots and sets it as the context value before invoking 
nested actions.

## Example

```ts
import { ActionObject, GetValueAction } from 'action-object'
const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
const valueAction = new GetValueAction('d.e.f', [new ActionObject(object)]);
const context = {}
valueAction.act(context);   // context.value === 88
```

## Extends

- [`ValueAction`](ValueAction.md)

## Constructors

### new GetValueAction()

> **new GetValueAction**(`path`, `roots`, ...`reactions`): [`GetValueAction`](GetValueAction.md)

#### Parameters

• **path**: `string`

• **roots**: [`ActionObject`](ActionObject.md)[]

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

[`GetValueAction`](GetValueAction.md)

#### Inherited from

[`ValueAction`](ValueAction.md).[`constructor`](ValueAction.md#constructors)

#### Defined in

action-object/src/action-object.ts:505

## Properties

### path

> **path**: `string`

#### Inherited from

[`ValueAction`](ValueAction.md).[`path`](ValueAction.md#path)

#### Defined in

action-object/src/action-object.ts:503

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

[class-action/dist/class-action.d.ts:55](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L55)

***

### roots

> **roots**: [`ActionObject`](ActionObject.md)[]

#### Inherited from

[`ValueAction`](ValueAction.md).[`roots`](ValueAction.md#roots)

#### Defined in

action-object/src/action-object.ts:504

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

[class-action/dist/class-action.d.ts:43](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L43)

## Methods

### act()

> **act**(`context`?): `any`

Performs the local action and triggers all reactions.

#### Parameters

• **context?**: `any`

#### Returns

`any`

#### Inherited from

[`ValueAction`](ValueAction.md).[`act`](ValueAction.md#act)

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

#### Defined in

[class-action/dist/class-action.d.ts:130](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L130)

***

### addReactions()

> **addReactions**(...`reactions`): `void`

Adds the given reactions to this ClassAction. This allows for
more implementation flexibility in derived classes.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

`void`

#### Inherited from

[`ValueAction`](ValueAction.md).[`addReactions`](ValueAction.md#addreactions)

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

#### Defined in

[class-action/dist/class-action.d.ts:183](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L183)

***

### doAction()

> **doAction**(`context`?): `void`

Performs the local action

#### Parameters

• **context?**: `any`

#### Returns

`void`

#### Overrides

[`ValueAction`](ValueAction.md).[`doAction`](ValueAction.md#doaction)

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

#### Defined in

action-object/src/action-object.ts:526

***

### doReactions()

> **doReactions**(`context`?): `any`

Triggers all reactions of this ClassAction

#### Parameters

• **context?**: `any`

#### Returns

`any`

#### Inherited from

[`ValueAction`](ValueAction.md).[`doReactions`](ValueAction.md#doreactions)

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

#### Defined in

[class-action/dist/class-action.d.ts:164](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L164)

***

### getAllReactions()

> **getAllReactions**(`context`?): `ClassAction`\<`any`\>[]

Gets all class and instance reactions. This is used internally
to obtain all reactions to trigger after the local action has
been executed.

#### Parameters

• **context?**: `any`

#### Returns

`ClassAction`\<`any`\>[]

#### Inherited from

[`ValueAction`](ValueAction.md).[`getAllReactions`](ValueAction.md#getallreactions)

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

#### Defined in

[class-action/dist/class-action.d.ts:114](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L114)

***

### getReactions()

> **getReactions**(`context`?): `ClassAction`\<`any`\>[]

Returns all instance reactions of this ClassAction.
By default it simply returns [ClassAction#reactions](ObjectPropAction.md#reactions).

#### Parameters

• **context?**: `any`

#### Returns

`ClassAction`\<`any`\>[]

#### Inherited from

[`ValueAction`](ValueAction.md).[`getReactions`](ValueAction.md#getreactions)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.getReactions();
```

#### Defined in

[class-action/dist/class-action.d.ts:96](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L96)

***

### removeReaction()

> **removeReaction**(`reaction`): `void`

Removes the specified reaction.

#### Parameters

• **reaction**: `ClassAction`\<`any`\>

#### Returns

`void`

#### Inherited from

[`ValueAction`](ValueAction.md).[`removeReaction`](ValueAction.md#removereaction)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.removeReaction(reaction2);
```

#### Defined in

[class-action/dist/class-action.d.ts:195](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L195)

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

#### Inherited from

[`ValueAction`](ValueAction.md).[`getReactions`](ValueAction.md#getreactions-1)

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
class MyClassAction extends ClassAction {
   static reactions = [reaction1, reaction2]
}
MyClassAction.getReactions();
```

#### Defined in

[class-action/dist/class-action.d.ts:82](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L82)
