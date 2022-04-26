import { CONTEXT_ACTION_TYPE as type } from '../../../consts/contextActionType';

export const login = (username, token) => ({
    type: type.login,
    payload: {
        username,
        token
    }
});

export const logout = () => ({
    type: type.logout
});


