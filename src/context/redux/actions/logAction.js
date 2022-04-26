import { CONTEXT_ACTION_TYPE as type } from '../../../consts/contextActionType';

export const addLog = (message) => ({
    type: type.addLog,
    payload: {
        message
    }
});

export const clearLog = () => ({
    type: type.clearLog,
    payload: {}
});
