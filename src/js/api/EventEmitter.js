/**
 * Created by hoho on 2018. 7. 3..
 */

/**
 * @brief   This module provide custom events.
 * @param   object    An object that requires custom events.
 *
 * */

const EventEmitter = function(object){
    let that = object;
    let _events =[];

    const triggerEvents = function(events, args, context){
        let i = 0;
        let length = events.length;
        for(i = 0; i < length; i ++){
            let event = events[i];
            event.listener.apply( ( event.context || context ), args);
        }
    };

    that.on = function(name, listener, context){
        (_events[name] || (_events[name]=[]) ).push({ listener: listener  , context : context});
        return that;
    };
    that.trigger = function(name){
        if(!_events){
            return false;
        }
        const args = [].slice.call(arguments, 1);
        const events = _events[name];
        const allEvents = _events.all;

        if(events){
            triggerEvents(events, args, that);
        }
        if(allEvents){
            triggerEvents(allEvents, arguments, that);
        }
    };
    that.off = function(name, listener, context){
        if(!_events){
            return false;
        }

        if (!name && !listener && !context)  {
            _events = [];
            return that;
        }

        const names = name ? [name] : Object.keys(_events);

        for (let i = 0, l = names.length; i < l; i++) {
            name = names[i];
            const events = _events[name];
            if (events) {
                const retain = _events[name] = [];
                if (listener  || context) {
                    for (let j = 0, k = events.length; j < k; j++) {
                        const event = events[j];
                        if ((listener && listener !== event.listener && listener !== event.listener.listener  && listener !== event.listener._listener)
                            ||(context && context !== event.context)
                        ) {
                            retain.push(event);
                        }
                    }
                }
                if (!retain.length) {
                    delete _events[name];
                }
            }
        }
        return that;
    };
    that.once = function(name, listener, context){
        let count = 0;
        const onceCallback = function() {
            if (count++) {
                return;
            }
            that.off(name, onceCallback);
            listener.apply(that, arguments);
        };
        onceCallback._listener = listener;
        return that.on(name, onceCallback, context);
    };

    return that;
}

export default EventEmitter;
