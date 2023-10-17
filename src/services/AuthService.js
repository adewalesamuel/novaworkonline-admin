import { Api } from './Api';

const  ENPOINTS = {
    Login: 'admin/login',
    Logout: 'admin/logout'
};


const login = (payload, signal) => {
    return Api.post(ENPOINTS.Login, payload, signal)
}

const logout = (payload, signal) => {
    return Api.post(ENPOINTS.Logout, payload, signal)
}


export const AuthService = {
    login,
    logout
}