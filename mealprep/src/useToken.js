import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.success
  };

  const [success, isLoggedIn] = useState(getToken());

  const saveToken = (userToken, shouldSave) => {

    if(shouldSave){
        sessionStorage.setItem('token', JSON.stringify(userToken));
        return isLoggedIn(userToken.success);
    }else{
        return isLoggedIn(userToken.success);
    }

  };

  return {
    isLoggedIn: saveToken,
    success
  }
}