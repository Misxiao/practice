
const PENDING = "Pending";
const FULFILLED = "Fulfilled"
const REJECT = "Reject"

class MyPromise {
    constructor(executor) {
        this._status = PENDING;
        this._result = null;
        this._error = null;
        this._resolveQueue = [];
        this._rejectQueue = [];

        if (typeof executor == "function") {
            executor(this._resolve, this._reject);
        } else {
            console.error("....");
        }

    }

    _resolve = (value) => {
        if (this._status == PENDING) {
            this._status = FULFILLED;
            this._result = value;
            this._resolveQueue.forEach(fn => { fn() });
        }
    }

    _reject = (error) => {
        if (this._status == PENDING) {
            this._status = REJECT;
            this._error = error;
            this._rejectQueue.forEach(fn => { fn() });
        }
    }

    then = (onFulfilled, onRejected) => {
        return new MyPromise((resolve, reject) => {
            const fulfilledFn = () => {
                try {
                    if (typeof onFulfilled == "function") {
                        const result = onFulfilled(this._result);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    }
                } catch (err) {
                    reject(err);
                }
            }

            const rejectFn = () => {
                try {
                    if (typeof onRejected == "function") {
                        const error = onRejected(this._error);
                        error instanceof MyPromise ? error.then(resolve, reject) : resolve(error);
                    } else {
                        reject(this._error);
                    }
                } catch (err) {
                    reject(err);
                }
            }

            if (this._status == PENDING) {
                this._resolveQueue.push(fulfilledFn);
                this._rejectQueue.push(rejectFn);
            } else if (this._status == FULFILLED) {
                fulfilledFn()
            } else {
                rejectFn()
            }
        })
    }

    catch = (onCatch) => {
        return this.then(() => { }, onCatch);
    }
}

MyPromise.prototype.resolve = (value) => {
    if(value instanceof MyPromise) return value;

    return new Promise((resolve) => resolve(value));
}

MyPromise.all = (queue) => {
    if(Object.prototype.toString.call(queue) != "[object Array]") {
        console.log('....');
        return ;
    }

    let count = 0;
    let responseList = [];

    return new MyPromise((resolve, reject) => {
        queue.forEach((value, index) => {
            Promise.resolve(value).then(res => {
                responseList[index] = res;
                count ++;
                if(count == queue.length) {
                    resolve(responseList);
                }
            }, err => {
                reject(err);
            })
        })
    })

}

MyPromise.race = (queue) => {
    if(Object.prototype.toString.call(queue) != "[object Array]") {
        console.log('....');
        return ;
    }
    return new MyPromise((resolve, reject) => {
        queue.forEach((value, index) => {
            Promise.resolve(value).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            })
        })
    })
}

MyPromise.race([
    new MyPromise(r => { setTimeout(() => {r(100)}, 3000) }),
    new MyPromise(r => { setTimeout(() => {r(200)}, 2000) })
]).then(v => console.log(v))

// new MyPromise((r, d) => {
//     console.log("start");
//     setTimeout(() => {
//         d("faild 1");
//     }, 2000)
//     console.log("test");
// }).then(s => {
//     console.log(s);
// }, e => {
//     console.log(e);
//     return new MyPromise((s, d) => { d("faild 3") })
// }).catch(e => {
//     console.log('err', e)
// })

// new MyPromise((resolve, reject) => {
//     console.log("start");
//     setTimeout(() => {
//         reject("faild 1");
//     }, 2000)
//     console.log("test");
// }).then(s => {
//     console.log(s);
//     return new MyPromise((a, d) => d(5555));
// }, e => {
//     console.log(e);
//     return "faild 2"
// }).then(s => {
//     console.log(11111, s);
// }).catch(e => {
//     console.log(e);
// })