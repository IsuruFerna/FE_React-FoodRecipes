export const SET_USER = "SET_USER";

export const getUserData = () => {
   return async (dispatch) => {
      try {
         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/user/api/token/"
         );

         console.log("htis is out response: ", response);

         if (response.ok) {
            let fetchData = await response.json();

            console.log("this is response: ", fetchData);

            dispatch({
               type: SET_USER,
               payload: fetchData,
            });
         } else {
            throw new Error("Login Error");
         }
      } catch (error) {
         console.log(error);
      }
   };
};
