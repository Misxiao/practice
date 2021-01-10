
const _ = Symbol('curry');

const curry = function (foo, args = []) {
    if (typeof foo != 'function') {
        console.log('...');
        return () => { };
    }
    const argsCount = foo.length;
    return function () {

        let _args = [];
        let holes = Array.prototype.slice.call(arguments, 0);
        let count = 0, argIndex = 0, holeIndex = 0;
        for (let i = 0; i < argsCount; i++) {
            if (argIndex < args.length) {
                _args[i] = args[argIndex++];
                if (_args[i] === _ && holeIndex < holes.length) {
                    _args[i] = holes[holeIndex++];
                }
            } else if (holeIndex < holes.length) {
                _args[i] = holes[holeIndex++];
            } else {
                _args[i] = _;
            }
            count += _args[i] === _ ? 0 : 1;
        }
        // console.log(args, holes, _args, count);
        if (count < argsCount) {
            return curry.call(this, foo, _args);
        } else {
            return foo.apply(this, _args);
        }
    }
}

var fn = curry(function (a, b, c, d, e) {
    console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
fn(1, 2, 3, 4, 5);
fn(_, 2, 3, 4, 5)(1);
fn(1, _, 3, 4, 5)(2);
fn(1, _, 3)(_, 4)(2)(5);
fn(1, _, _, 4)(_, 3)(2)(5);
fn(_, 2)(_, _, 4)(1)(3)(5);

fn(_, 2)(_, _, 4)(1)(undefined)(5)

const add = (a, b) => {
    return a + b;
}

const addCurry = curry(add);

console.log(addCurry(1));
console.log(addCurry(1)(2));
console.log(addCurry(1, 2));