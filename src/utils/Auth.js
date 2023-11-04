const getSessionToken = () => {
    return localStorage.getItem('atk');
}

const isLoggedIn = () => {
    if (getSessionToken() === '' || !getSessionToken())
        return false;

    return true;
}

const setSessionToken = token => {
    localStorage.setItem('atk', token)
}

const setUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
}

const removeSessionToken = () => {
    localStorage.removeItem('atk');
    localStorage.removeItem('user');
}

const redirectIfSessionExpired = () => {
    removeSessionToken();
    console.log('not logged in');
    window.location.assign('/connexion');
}

const getUser = () => {
    return {
        ...JSON.parse(localStorage.getItem('user'))
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    redirectIfSessionExpired,
    getUser,
    setUser
}
