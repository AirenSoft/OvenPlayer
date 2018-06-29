import _ from 'utils/underscore';

/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */
const LazyCommandExecutor = function (instance, queuedCommands) {
    let commandQueue = [];
    let undecoratedMethods = {};
    let executeMode = false;
    let that = {};
    OvenPlayerConsole.log("LazyCommandExecutor loaded.");
    queuedCommands.forEach((command) => {
        const method = instance[command];
        undecoratedMethods[command] = method || function(){};

        instance[command] = function() {
            const args = Array.prototype.slice.call(arguments, 0);
              if (!executeMode) {
                //commandQueue.push({ command, args });
                that.addQueue(command, args)
            } else {
                executeQueuedCommands();
                if (method) {
                    method.apply(that, args);
                }
            }
        };
    });
    var executeQueuedCommands = function () {
        while (commandQueue.length > 0) {
            const { command, args } = commandQueue.shift();
            (undecoratedMethods[command] || instance[command]).apply(instance, args);
        }
    }

    that.setExecuteMode = (mode) => {
        executeMode = mode;
        OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()", mode);
    };
    that.getUndecoratedMethods = function(){
        OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()", undecoratedMethods);
        return undecoratedMethods;
    }
    that.getQueue = function(){
        OvenPlayerConsole.log("LazyCommandExecutor : getQueue()", getQueue);
        return commandQueue;
    }
    that.addQueue = function(command, args){
        OvenPlayerConsole.log("LazyCommandExecutor : addQueue()", command, args);
        commandQueue.push({ command, args });
    }

    that.flush = function(){
        OvenPlayerConsole.log("LazyCommandExecutor : flush()");
        executeQueuedCommands();
    };
    that.empty = function() {
        OvenPlayerConsole.log("LazyCommandExecutor : empty()");
        commandQueue.length = 0;
    };
    that.off = function() {
        OvenPlayerConsole.log("LazyCommandExecutor : off()");
        queuedCommands.forEach((command) => {
            const method = undecoratedMethods[command];
            if (method) {
                instance[command] = method;
                delete undecoratedMethods[command];
            }
        });
    };


    //Run once at the end
    that.removeAndExcuteOnce = function(command_){
        let commandQueueItem = _.findWhere(commandQueue, {command : command_});
        OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()", command_);
        commandQueue.splice(_.findIndex(commandQueue, {command : command_}), 1);

        const method = undecoratedMethods[command_];
        if (method) {
            OvenPlayerConsole.log("removeCommand()");
            if(commandQueueItem){
                (method|| instance[command_]).apply(instance, commandQueueItem.args);
            }
            instance[command_] = method;
            delete undecoratedMethods[command_];
        }
    };

    that.destroy = function() {
        OvenPlayerConsole.log("LazyCommandExecutor : destroy()");
        that.off();
        that.empty();
    };
    return that;
}

export default LazyCommandExecutor;