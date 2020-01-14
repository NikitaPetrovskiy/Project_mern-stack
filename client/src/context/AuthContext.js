import { createContext } from 'react';

//empty func
const noop = () => {};

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});
