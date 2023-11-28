// src/actions/userActions.js
export const setUserData = () => {
  const userDataFromLocalStorage = localStorage.getItem('userData');
  const parsedUserData = JSON.parse(userDataFromLocalStorage);
  return {
    type: 'SET_USER_DATA',
    payload: parsedUserData
  };
};

export const clearUserData = () => { 
  return {
    type: 'CLEAR_USER_DATA'
  };
};
