import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.success
  };

  const [success, isLoggedIn] = useState(getToken());

  console.log(success);

  const saveToken = userToken => {
    console.log(userToken)
    sessionStorage.setItem('token', JSON.stringify(userToken));
    return isLoggedIn(userToken.success);
  };

  return {
    isLoggedIn: saveToken,
    success
  }
}