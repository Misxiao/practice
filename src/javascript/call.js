Function.prototype.MyCall = function () {
    let result = null;

    let [ context, ...others ] = arguments || [];

    context = Object(context) || window || global;
    context.fn = this;

    // ES6
    //result = context.fn(...others);

    if(others.length == 0) {
        result = context.fn();
    } else {
        const arr = others.map((value, index) => ('others[' + index + ']'));
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

foo.MyCall(obj, 'bbbbb');