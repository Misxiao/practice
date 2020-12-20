Function.prototype.MyBind = function() {
    let [ context, ...args ] = arguments || [];

    context = context || window || global;

    const fn = this;

    const fBind = function() {
        const bindArgs = Array.prototype.slice.call(arguments);
        return fn.apply(context, args.concat(bindArgs));
    }
    
    // 考虑继承
    const foo = function() {};
    foo.prototype = fn.prototype;
    fBind.prototype = new foo();

    return fBind;

}


const a = {
    value: '...'
}

function foo(a, b) {
    console.log(this.value, a, b);
}

const bindFoo = foo.MyBind(a, '1');
bindFoo(2);