[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / ObjectPropAction

# Class: ObjectPropAction

A class-action that sets or deletes an object property. The 
property is set if the value (in the context) is not undefined; otherwise 
it is deleted.

## Example

```ts
import { ObjectPropAction } from 'action-object'
const propAction = new ObjectPropAction();
const object = { a: 1, b: 99 };
propAction.act({ object, key: 'a', value: 78 });
console.log(object);  // { a: 78, b: 99 }
```

## Extends

- `ClassAction`\<[`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)\>

## Constructors

### new ObjectPropAction()

> **new ObjectPropAction**(...`reactions`): [`ObjectPropAction`](ObjectPropAction.md)

Creates a new ClassAction object containing the optionally provided reactions.

#### Parameters

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

[`ObjectPropAction`](ObjectPropAction.md)

#### Inherited from

`ClassAction<IObjectPropActionContext>.constructor`

#### Example

```ts
import { ClassAction } from 'class-action'
const classAction = new ClassAction()
```

#### Defined in

[class-action/dist/class-action.d.ts:65](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L65)

## Properties

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

`ClassAction.reactions`

#### Defined in

[class-action/dist/class-action.d.ts:55](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L55)

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

`ClassAction.reactions`

#### Defined in

[class-action/dist/class-action.d.ts:43](https://github.com/mksunny1/class-action/blob/99e9dbff5e20c254b0433d21d21fcbb4bdbd7f51/dist/class-action.d.ts#L43)

## Methods

### act()

> **act**(`context`?): `any`

Performs the local action and triggers all reactions.

#### Parameters

• **context?**: [`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)

#### Returns

`any`

#### Inherited from

`ClassAction.act`

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

`ClassAction.addReactions`

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

### delete()

> **delete**(`object`, `key`): `void`

#### Parameters

• **object**: `any`

• **key**: [`IKey`](../type-aliases/IKey.md)

#### Returns

`void`

#### Defined in

action-object/src/action-object.ts:57

***

### doAction()

> **doAction**(`context`?): `void`

#### Parameters

• **context?**: [`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)

#### Returns

`void`

#### Overrides

`ClassAction.doAction`

#### Defined in

action-object/src/action-object.ts:47

***

### doReactions()

> **doReactions**(`context`?): `any`

Triggers all reactions of this ClassAction

#### Parameters

• **context?**: [`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)

#### Returns

`any`

#### Inherited from

`ClassAction.doReactions`

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

• **context?**: [`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)

#### Returns

`ClassAction`\<`any`\>[]

#### Inherited from

`ClassAction.getAllReactions`

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

• **context?**: [`IObjectPropActionContext`](../interfaces/IObjectPropActionContext.md)

#### Returns

`ClassAction`\<`any`\>[]

#### Inherited from

`ClassAction.getReactions`

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

`ClassAction.removeReaction`

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

### set()

> **set**(`object`, `key`, `value`): `void`

#### Parameters

• **object**: `any`

• **key**: [`IKey`](../type-aliases/IKey.md)

• **value**: `any`

#### Returns

`void`

#### Defined in

action-object/src/action-object.ts:54

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

`ClassAction.getReactions`

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
