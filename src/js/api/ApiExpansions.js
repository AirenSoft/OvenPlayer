/**
 * Created by hoho on 2018. 8. 24..
 */

export const ApiRtmpExpansion = function(currentProvider){
    return {
        externalCallbackCreep : (result) => {
            if(result.name && result.data){
                return currentProvider.triggerEventFromExternal(result.name, result.data);
            }else{
                return null;
            }
        }
    };
};
