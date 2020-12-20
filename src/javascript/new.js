const myNew = function(constructor) {

    const args = Array.prototype.slice.call(arguments, 1);

    const obj = Object.create();
    obj.__proto__ = constructor.prototype;

    constructor.apply(obj, args);

    return obj;

}
