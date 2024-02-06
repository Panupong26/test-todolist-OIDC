const setToken = (token) => {
    localStorage.setItem('ACCESS_TOKEN', token);
}

const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN');
}

const removeToken = () => {
    localStorage.removeItem('ACCESS_TOKEN');
}

const getStatus = () => {
    if(getToken()) {
        return 'user';
    } else {
        return 'guest';
    }
}

const localstorege = {
    setToken,
    getToken,
    removeToken,
    getStatus
}

export default localstorege