[**action-object**](../README.md) • **Docs**

***

[action-object](../globals.md) / ValueAction

# Class: ValueAction\<T\>

## Extends

- `ClassAction`\<`any`\>

## Extended by

- [`GetValueAction`](GetValueAction.md)
- [`CallValueAction`](CallValueAction.md)

## Type Parameters

• **T** = `string`

## Constructors

### new ValueAction()

> **new ValueAction**\<`T`\>(`path`, `roots`, ...`reactions`): [`ValueAction`](ValueAction.md)\<`T`\>

#### Parameters

• **path**: `T`

• **roots**: [`ActionObject`](ActionObject.md)[]

• ...**reactions**: `ClassAction`\<`any`\>[]

#### Returns

[`ValueAction`](ValueAction.md)\<`T`\>

#### Overrides

`ClassAction<any>.constructor`

#### Defined in

[action-object/src/action-object.ts:505](https://github.com/mksunny1/action-object/blob/d3b79ef45403db2af53250402a32918daa4abb39/src/action-object.ts#L505)

## Properties

### path

> **path**: `T`

#### Defined in

[action-object/src/action-object.ts:503](https://github.com/mksunny1/action-object/blob/d3b79ef45403db2af53250402a32918daa4abb39/src/action-object.ts#L503)

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

`ClassAction.reactions`

#### Defined in

[class-action/dist/class-action.d.ts:55](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L55)

***

### roots

> **roots**: [`ActionObject`](ActionObject.md)[]

#### Defined in

[action-object/src/action-object.ts:504](https://github.com/mksunny1/action-object/blob/d3b79ef45403db2af53250402a32918daa4abb39/src/action-object.ts#L504)

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

[class-action/dist/class-action.d.ts:43](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L43)

## Methods

### act()

> **act**(`context`?): `any`

Performs the local action and triggers all reactions.

#### Parameters

• **context?**: `any`

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

[class-action/dist/class-action.d.ts:130](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L130)

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

[class-action/dist/class-action.d.ts:183](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L183)

***

### doAction()

> **doAction**(`context`?): `any`

Performs the local action

#### Parameters

• **context?**: `any`

#### Returns

`any`

#### Inherited from

`ClassAction.doAction`

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

[class-action/dist/class-action.d.ts:147](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L147)

***

### doReactions()

> **doReactions**(`context`?): `any`

Triggers all reactions of this ClassAction

#### Parameters

• **context?**: `any`

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

[class-action/dist/class-action.d.ts:164](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L164)

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

[class-action/dist/class-action.d.ts:114](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L114)

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

`ClassAction.getReactions`

#### Example

```ts
import { ClassAction } from 'class-action'
const reaction1 = new ClassAction(), reaction2 = new ClassAction();
const myClassAction = new ClassAction(reaction1, reaction2);
myClassAction.getReactions();
```

#### Defined in

[class-action/dist/class-action.d.ts:96](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L96)

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

[class-action/dist/class-action.d.ts:195](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L195)

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

[class-action/dist/class-action.d.ts:82](https://github.com/mksunny1/class-action/blob/047307663983c6e6fa0ca74cb830dfe1a09a8025/dist/class-action.d.ts#L82)
