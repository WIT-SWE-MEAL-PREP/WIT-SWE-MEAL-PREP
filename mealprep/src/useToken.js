import { useState } from 'react';

export default function useToken() {
    const getToken = () => {

        const tokenString = sessionStorage.getItem('loggedIn');
        const userToken = JSON.parse(tokenString);
        return userToken?.loggedIn
    
    }
    
    const [loggedIn, isLoggedIn] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        isLoggedIn(userToken.loggedIn)
    };

    return {
        isLoggedIn: saveToken,
        loggedIn
    }
}