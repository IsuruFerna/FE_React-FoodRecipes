export const SET_USER_DATA = "SET_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER";

export const setReduxUserData = (decodedData) => {
   return {
      type: SET_USER_DATA,
      payload: decodedData,
   };
};

export const removeUserData = () => {
   return {
      type: REMOVE_USER_DATA,
   };
};
