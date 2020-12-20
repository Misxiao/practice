Function.prototype.MyApply = function (context, args) {
    let result = null;

    context = Object(context) || window || global;
    context.fn = this;

    // ES6
    //result = context.fn(...args);

    if(args.length == 0) {
        result = context.fn();
    } else {
        const arr = args.map((value, index) => ('args[' + index + ']'));
        result = eval('context.fn(' + arr + ')');
    }

    delete context.fn;
    return result;

}

// test ....
const obj = {
    value: 'aaaaa'
}

function foo(a) {
    console.log(this.value, a);
}

foo.MyApply(obj, ['bbbbb']);