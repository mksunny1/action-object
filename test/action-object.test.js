import { splitOnce, ObjectPropAction, ObjectCallAction, ActionObject, 
    getValue, callValue, GetValueAction, CallValueAction } from "../dist/action-object.js";
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'

describe('splitOnce', async (t) => {
    await it('Should correctly split on only the first separator', (t) => {
        const split = splitOnce('a.b.c.d', '.');
        assert.deepEqual(split, ['a', 'b.c.d']);
    });
    await it('Should return an array containing the input string if the separator is absent', (t) => {
        const split = splitOnce('a.b.c.d', '_');
        assert.deepEqual(split, ['a.b.c.d']);
    });
});

describe('ObjectPropAction.constructor', async (t) => {
    await it('Should construct a valid ObjectPropAction', (t) => {
        const propAction = new ObjectPropAction();
        assert.equal(propAction instanceof ObjectPropAction, true);
        assert.deepEqual(Object.keys(propAction), []);
        assert.equal(propAction.reactions, undefined);
    });
});

describe('ObjectPropAction.set', async (t) => {
    await it('Should set the correct object property correctly', (t) => {
        const propAction = new ObjectPropAction();
        const object = { a: 1, b: 99 }
        propAction.doAction({ object, key: 'a', value: 78 });
        assert.equal(object.a, 78);
    });
    await it('Should trigger reactions', (t) => {
        const reactionObject = {};
        const propAction = new ObjectPropAction( { act(context) { reactionObject[context.key] = context.value } } );
        const object = { a: 1, b: 99 }
        propAction.act({ object, key: 'a', value: 78 });
        assert.equal(object.a, 78);
        assert.equal(reactionObject.a, 78);
    });
});

describe('ObjectPropAction.delete', async (t) => {
    await it('Should delete property if set to undefined', (t) => {
        const propAction = new ObjectPropAction();
        const object = { a: 1, b: 99 }
        propAction.doAction({ object, key: 'a', value: undefined });
        assert.equal(object.hasOwnProperty('a'), false);
    });

    await it('Should not delete property if set to null', (t) => {
        const propAction = new ObjectPropAction();
        const object = { a: 1, b: 99 }
        propAction.doAction({ object, key: 'a', value: null });
        assert.equal(object.hasOwnProperty('a'), true);
    });
});

describe('ObjectCallAction.constructor', async (t) => {
    await it('Should construct a valid ObjectCallAction', (t) => {
        const callAction = new ObjectCallAction();
        assert.equal(callAction instanceof ObjectCallAction, true);
        assert.deepEqual(Object.keys(callAction), []);
        assert.equal(callAction.reactions, undefined);
    });

});

describe('ObjectCallAction.doAction', async (t) => {
    await it('Should call the correct object method correctly', (t) => {
        const callAction = new ObjectCallAction();
        const object = [1, 2, 3]
        callAction.doAction({ object, method: 'push', args: [9, 8, 7] });
        assert.deepEqual(object, [1, 2, 3, 9, 8, 7]);
    });
    await it('Should trigger reactions', (t) => {
        const reactionObject = [];
        const callAction = new ObjectCallAction( { act(context) { reactionObject[context.method](...context.args) } } );
        const object = [1, 2, 3]
        callAction.act({ object, method: 'push', args: [9, 7, 5] });
        assert.deepEqual(object, [1, 2, 3, 9, 7, 5]);
        assert.deepEqual(reactionObject, [9, 7, 5]);
    });
});


describe('ActionObject.constructor', async (t) => {
    await it('Should construct a valid ActionObject', (t) => {
        const object = { a: 1, b: 2, c: 3 }
        const actionObject = new ActionObject(object);
        assert.equal(actionObject instanceof ActionObject, true);
        assert.deepEqual(Object.keys(actionObject), ['object']);
        assert.equal(actionObject.object, object);
    });

});

describe('ActionObject.addAction', async (t) => {
    await it('Should add the specified set action correctly', (t) => {
        const reactionObject = {};
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.addActions('a', [{ act(context) { reactionObject[context.key] = context.value } }], 'set');
        actionObject.set( 'a', 78 );
        assert.equal(object.a, 78);
        assert.equal(reactionObject.a, 78);
    });
    await it('Should add the specified call action correctly', (t) => {
        const reactionObject = [];
        const object = { a: {b: [1, 2, 3]} }
        const actionObject = new ActionObject(object);
        actionObject.addActions('a.b.push', [{ act(context) { reactionObject[context.method](...context.args) } }], 'call');
        assert.throws(() => actionObject.call( 'push', 9, 7, 5));   // push not a method here
        assert.throws(() => actionObject.getChild('a').call( 'push', 9, 7, 5));   // push not a method here
        assert.throws(() => actionObject.getChild('b', true).call( 'push', 9, 7, 5));   // push not a method here
        actionObject.getChild('a.b').call( 'push', 9, 7, 5);
        assert.deepEqual(object.a.b, [1, 2, 3, 9, 7, 5]);
        assert.deepEqual(reactionObject, [9, 7, 5]);
    });
});

describe('ActionObject.act', async (t) => {
    await it('Should trigger all set reactions', (t) => {
        const reactionObject = {};
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.addActions('a', [{ act(context) { reactionObject[context.key] = context.value } }], 'set');
        actionObject.addActions('b', [{ act(context) { reactionObject[context.key] = context.value } }], 'set');
        actionObject.act();
        assert.equal(reactionObject.a, 1);
        assert.equal(reactionObject.b, 99);
    });
});

describe('ActionObject.set', async (t) => {
    await it('Should set the correct object property correctly', (t) => {
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.set( 'a', 78 );
        assert.equal(object.a, 78);
    });
    await it('Should trigger reactions', (t) => {
        const reactionObject = {};
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.addActions('a', [{ act(context) { reactionObject[context.key] = context.value } }], 'set');
        actionObject.set( 'a', 78 );
        assert.equal(object.a, 78);
        assert.equal(reactionObject.a, 78);
    });
    await it('Should delete property if set to undefined', (t) => {
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.set( 'a', undefined );
        assert.equal(object.hasOwnProperty('a'), false);
    });

    await it('Should not delete property if set to null', (t) => {
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.set( 'a', null );
        assert.equal(object.hasOwnProperty('a'), true);
    });
});

describe('ActionObject.setAll', async (t) => {
    await it('Should set the correct object properties correctly', (t) => {
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object);
        actionObject.setAll( { a: 78 , b: 34} );
        assert.equal(object.a, 78);
        assert.equal(object.b, 34);
    });
});

describe('ActionObject.call', async (t) => {
    await it('Should call the correct object method correctly', (t) => {
        const object = [1, 2, 3]
        const actionObject = new ActionObject(object);
        actionObject.call( 'push', 9, 8, 7);
        assert.deepEqual(object, [1, 2, 3, 9, 8, 7]);
    });
    await it('Should trigger reactions', (t) => {
        const reactionObject = [];
        const object = [1, 2, 3]
        const actionObject = new ActionObject(object);
        actionObject.addActions('push', [{ act(context) { reactionObject[context.method](...context.args) } }], 'call');
        actionObject.call( 'push', 9, 7, 5);
        assert.deepEqual(object, [1, 2, 3, 9, 7, 5]);
        assert.deepEqual(reactionObject, [9, 7, 5]);
    });
});

describe('ActionObject.createProxy', async (t) => {
    await it('Should set the correct object property correctly', (t) => {
        const object = { a: 1, b: 99 }
        const actionObject = new ActionObject(object).createProxy();
        actionObject.a = 78;
        assert.equal(object.a, 78);
    });
    await it('Should call the correct object method correctly', (t) => {
        const object = [1, 2, 3]
        const actionObject = new ActionObject(object).createProxy();
        actionObject.push(9, 8, 7);
        assert.deepEqual(object, [1, 2, 3, 9, 8, 7]);
    });
});

describe('ActionObject.getChild', async (t) => {
    await it('Should return the correct child ActionObject', (t) => {
        const object = { a: 1, b: 2, c: { d: 4 } }
        const actionObject = new ActionObject(object);
        assert.equal(actionObject.getChild('a', 1).object, 1);
        assert.equal(actionObject.getChild('b', 1).object, 2);
        assert.deepEqual(actionObject.getChild('c', 1).object, object.c);
    });
});

describe('ActionObject.getValue', async (t) => {
    await it('Should return the correct value', (t) => {
        const object = { a: 1, b: 2, c: { d: 4 } }
        const actionObject = new ActionObject(object);
        assert.equal(actionObject.getValue('a'), 1);
        assert.equal(actionObject.getValue('b'), 2);
        assert.deepEqual(actionObject.getValue('c.d'), 4);
    });
});

describe('ActionObject.callValue', async (t) => {
    await it('Should call the correct method', (t) => {
        const object = { a: 1, b: 2, c: [6, 7, 8] }
        const actionObject = new ActionObject(object);
        actionObject.callValue('c.pop')
        assert.deepEqual(object.c, [6, 7]);
    });
});

describe('ActionObject.has', async (t) => {
    await it('Should return true for properties present in the wrapped object', (t) => {
        const object = { a: 1, b: 2, c: { d: 4 } }
        const actionObject = new ActionObject(object);
        assert.equal(actionObject.has('a'), true);
        assert.equal(actionObject.has('c.d'), true);
    });
    await it('Should return false for properties absent in the wrapped object', (t) => {
        const object = { a: 1, b: 2, c: { d: 4 } }
        const actionObject = new ActionObject(object);
        assert.equal(actionObject.has('cd'), false);
        assert.equal(actionObject.has('d'), false);
    });
});

describe('getValue', async (t) => {
    await it('Should return the value from the first root', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
        const actionObject = new ActionObject(object);
        assert.equal(getValue('c', actionObject), 3);
        assert.equal(getValue('d.e.f', actionObject, new ActionObject({})), 88);
    });

    await it('Should return the value from the second root', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
        const actionObject = new ActionObject(object);
        assert.equal(getValue('d.e.f', new ActionObject({}), actionObject), 88);
    });

    await it('Should return the value from the third root', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
        const actionObject = new ActionObject(object);
        assert.equal(getValue('d.e.f', new ActionObject({}), new ActionObject({}), actionObject), 88);
    });

});

describe('callValue', async (t) => {
    await it('Should call the value on the first root', (t) => {
        const object = { a: 1, b: 2, c: () => 33, d: { e: { f: [1, 2, 3] } } }
        const actionObject = new ActionObject(object);
        assert.equal(callValue('c', actionObject), 33);
        assert.equal(callValue('d.e.f.pop', actionObject, new ActionObject({})), 3);
    });

    await it('Should return the value from the second root', (t) => {
        const object = { a: 1, b: 2, c: () => 33, d: { e: { f: [1, 2, 3] } } }
        const actionObject = new ActionObject(object);
        assert.equal(callValue('d.e.f.pop', new ActionObject({}), actionObject), 3);
    });

    await it('Should return the value from the third root', (t) => {
        const object = { a: 1, b: 2, c: () => 33, d: { e: { f: [1, 2, 3] } } }
        const actionObject = new ActionObject(object);
        assert.equal(callValue('d.e.f.pop', new ActionObject({}), new ActionObject({}), actionObject), 3);
    });
});

describe('GetValueAction.constructor', async (t) => {
    await it('Should construct a valid GetValueAction', (t) => {
        const object = new ActionObject({ a: 1, b: 2, c: 3, d: { e: { f: 88 } } })
        const valueAction = new GetValueAction('d.e.f', [object]);
        assert.equal(valueAction instanceof GetValueAction, true);
        assert.deepEqual(Object.keys(valueAction), ['path', 'roots']);
        assert.equal(valueAction.reactions, undefined);
        assert.equal(valueAction.path, 'd.e.f');
        assert.deepEqual(valueAction.roots, [object]);
    });

});

describe('GetValueAction.doAction', async (t) => {
    await it('Should set the value on the context', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
        const valueAction = new GetValueAction('d.e.f', [new ActionObject(object)]);
        const context = {}
        valueAction.doAction(context);
        assert.equal(context.value, 88);
    });
    await it('Should trigger reactions', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: 88 } } }
        const valueAction = new GetValueAction('d.e.f', [new ActionObject(object)], { act(context) { context.value += 2 } });
        const context = {}
        valueAction.act(context);
        assert.equal(context.value, 90);
    });
});


describe('CallValueAction.constructor', async (t) => {
    await it('Should construct a valid CallValueAction', (t) => {
        const object = new ActionObject({ a: 1, b: 2, c: 3, d: { e: { f: [88, 99] } } })
        const valueAction = new CallValueAction('d.e.f.pop', [object]);
        assert.equal(valueAction instanceof CallValueAction, true);
        assert.deepEqual(Object.keys(valueAction), ['path', 'roots']);
        assert.equal(valueAction.reactions, undefined);
        assert.equal(valueAction.path, 'd.e.f.pop');
        assert.deepEqual(valueAction.roots, [object]);
    });

});

describe('CallValueAction.doAction', async (t) => {
    await it('Should set the return value on the context', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: [88, 99] } } }
        const valueAction = new CallValueAction('d.e.f.pop', [new ActionObject(object)]);
        const context = {}
        valueAction.doAction(context);
        assert.equal(context.value, 99);
    });
    await it('Should trigger reactions', (t) => {
        const object = { a: 1, b: 2, c: 3, d: { e: { f: [88, 99] } } }
        const valueAction = new CallValueAction('d.e.f.pop', [new ActionObject(object)], { act(context) { context.value += 2 } });
        const context = {}
        valueAction.act(context);
        assert.equal(context.value, 101);
    });
});

// still test: action-object.createProxy.

