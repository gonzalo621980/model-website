import { CONTEXT_ACTION_TYPE as type }  from '../../../consts/contextActionType';
import LocalStorage from "../../../context/storage/localStorage";


export const authReducer = ( state = { username: '', isAuthenticated: false }, action ) => {

    switch ( action.type ) {
        case type.login:
            LocalStorage.set('accessToken', action.payload.token);
            return {
                username: action.payload.username,
                isAuthenticated: true
            }

        case type.logout:
            LocalStorage.del('accessToken');
            return {
                username: '',
                isAuthenticated: false
            }
    
        default:
            return state;
    }

};
