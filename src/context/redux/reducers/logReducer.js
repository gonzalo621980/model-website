import { CONTEXT_ACTION_TYPE as type }  from '../../../consts/contextActionType';


export const logReducer = ( state = { messages: [] }, action ) => {

    switch ( action.type ) {
        case type.addLog:
            return {
                messages: [...state.messages, action.payload.message]
            }
        case type.clearLog:
            return {
                messages: []
            }
        default:
            return state;
    }

};
