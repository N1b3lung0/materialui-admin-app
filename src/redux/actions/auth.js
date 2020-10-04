import { types } from "../types/types";

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
});
