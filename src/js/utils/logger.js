/**
 * Created by hoho on 2018. 5. 24..
 */

const logger = function(id){
    const that = {};
    let prevConsoleLog = null;

    window.OvenPlayerConsole = {log : window['console']['log']};

    that.enable = () =>{
        if(prevConsoleLog == null){
            return;
        }
        OvenPlayerConsole['log'] = prevConsoleLog;
    };
    that.disable = () =>{
        prevConsoleLog = console.log;
        OvenPlayerConsole['log'] = function(){};
    };
    /*that.log = () => {

    };*/
    that.destroy = () =>{
        window.OvenPlayerConsole = null;
    };

    return that;
};


export default logger;