const slice = [].slice;
const eventsApi = function (obj, action, name, rest) {
    const eventSplitter = /\s+/;
    if (!name) {
        return true;
    }
    // Handle event maps.
    //
    if (typeof name === 'object') {
        for (var key in name) {
            if (Object.prototype.hasOwnProperty.call(name, key)) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
        }
        return false;
    }
    if (eventSplitter.test(name)) {
        const names = name.split(eventSplitter);
        for (let i = 0, l = names.length; i < l; i++) {
            obj[action].apply(obj, [names[i]].concat(rest));
        }
        return false;
    }
    return true;
}
const triggerEvents = function (events, args, context, catchExceptionsForName) {
    let i = -1;
    const l = events.length;
    while (++i < l) {
        const ev = events[i];
        if (catchExceptionsForName) {
            try {
                ev.callback.apply(ev.context || context, args);
            } catch (e) {
                OvenPlayerConsole.log('Error in "' + catchExceptionsForName + '" event handler:', e);
            }
        } else {
            ev.callback.apply(ev.context || context, args);
        }
    }
}

export const on = function (name, callback, context){
    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
        return this;
    }
    const _events = this._events || (this._events = {});
    const events = _events[name] || (_events[name] = []);
    events.push({ callback: callback, context: context });
    return this;
}

export const once = function (name, callback, context) {
    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
        return this;
    }
    let count = 0;
    const self = this;
    const onceCallback = function() {
        if (count++) {
            return;
        }
        self.off(name, onceCallback);
        callback.apply(this, arguments);
    };
    onceCallback._callback = callback;
    return this.on(name, onceCallback, context);
}

export const off = function (name, callback, context) {
    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
        return this;
    }
    if (!name && !callback && !context) {
        delete this._events;
        return this;
    }
    const names = name ? [name] : Object.keys(this._events);
    for (let i = 0, l = names.length; i < l; i++) {
        name = names[i];
        const events = this._events[name];
        if (events) {
            const retain = this._events[name] = [];
            if (callback || context) {
                for (let j = 0, k = events.length; j < k; j++) {
                    const ev = events[j];
                    if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                        (context && context !== ev.context)) {
                        retain.push(ev);
                    }
                }
            }
            if (!retain.length) {
                delete this._events[name];
            }
        }
    }
    return this;
}

export const trigger = function (name) {

    if (!this._events) {
        return this;
    }
    const args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) {
        return this;
    }
    const events = this._events[name];
    const allEvents = this._events.all;
    if (events) {
        triggerEvents(events, args, this);
    }
    if (allEvents) {
        triggerEvents(allEvents, arguments, this);
    }
    return this;
}

export default {
    on,
    once,
    off,
    trigger
};

