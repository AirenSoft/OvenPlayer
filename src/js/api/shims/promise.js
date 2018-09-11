//      Promise Polyfill
//      https://github.com/taylorhakes/promise-polyfill
//      Copyright (c) 2014 Taylor Hakes
//      Copyright (c) 2014 Forbes Lindesay
//      taylorhakes/promise-polyfill is licensed under the MIT License

const promiseFinally = function(callback) {
    var constructor = this.constructor;
    return this.then(
        function(value) {
            return constructor.resolve(callback()).then(function() {
                return value;
            });
        },
        function(reason) {
            return constructor.resolve(callback()).then(function() {
                return constructor.reject(reason);
            });
        }
    );
};

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
const setTimeoutFunc = window.setTimeout;
const setImmediateFunc = window.setImmediate;


function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
    return function() {
        fn.apply(thisArg, arguments);
    };
}

const PromiseShim = function (fn) {
    if (!(this instanceof Promise))
        throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
}

const handle = function (self, deferred) {
    while (self._state === 3) {
        self = self._value;
    }
    if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
    }
    self._handled = true;
    Promise._immediateFn(function() {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
            return;
        }
        var ret;
        try {
            ret = cb(self._value);
        } catch (e) {
            reject(deferred.promise, e);
            return;
        }
        resolve(deferred.promise, ret);
    });
}

const resolve = function (self, newValue) {
    try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self)
            throw new TypeError('A promise cannot be resolved with itself.');
        if (
            newValue &&
            (typeof newValue === 'object' || typeof newValue === 'function')
        ) {
            var then = newValue.then;
            if (newValue instanceof Promise) {
                self._state = 3;
                self._value = newValue;
                finale(self);
                return;
            } else if (typeof then === 'function') {
                doResolve(bind(then, newValue), self);
                return;
            }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
    } catch (e) {
        reject(self, e);
    }
}

const reject =function (self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
}

const finale = function (self) {
    if (self._state === 2 && self._deferreds.length === 0) {
        Promise._immediateFn(function() {
            if (!self._handled) {
                Promise._unhandledRejectionFn(self._value);
            }
        });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
}

const Handler = function (onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
const doResolve = function (fn, self) {
    var done = false;
    try {
        fn(
            function(value) {
                if (done) return;
                done = true;
                resolve(self, value);
            },
            function(reason) {
                if (done) return;
                done = true;
                reject(self, reason);
            }
        );
    } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
    }
}

PromiseShim.prototype['catch'] = function(onRejected) {
    return this.then(null, onRejected);
};

PromiseShim.prototype.then = function(onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
};

PromiseShim.prototype['finally'] = promiseFinally;

PromiseShim.all = function(arr) {
    return new Promise(function(resolve, reject) {
        if (!arr || typeof arr.length === 'undefined')
            throw new TypeError('Promise.all accepts an array');
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
            try {
                if (val && (typeof val === 'object' || typeof val === 'function')) {
                    var then = val.then;
                    if (typeof then === 'function') {
                        then.call(
                            val,
                            function(val) {
                                res(i, val);
                            },
                            reject
                        );
                        return;
                    }
                }
                args[i] = val;
                if (--remaining === 0) {
                    resolve(args);
                }
            } catch (ex) {
                reject(ex);
            }
        }

        for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
        }
    });
};

PromiseShim.resolve = function(value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
    }

    return new Promise(function(resolve) {
        resolve(value);
    });
};

PromiseShim.reject = function(value) {
    return new Promise(function(resolve, reject) {
        reject(value);
    });
};

PromiseShim.race = function(values) {
    return new Promise(function(resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject);
        }
    });
};

// Use polyfill for setImmediate for performance gains
PromiseShim._immediateFn =
    (typeof setImmediateFunc === 'function' &&
    function(fn) {
        setImmediateFunc(fn);
    }) ||
    function(fn) {
        setTimeoutFunc(fn, 0);
    };

PromiseShim._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
};

const Promise = window.Promise || (window.Promise = PromiseShim);

export const resolved = Promise.resolve();

export default Promise;
