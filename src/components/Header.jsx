import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUserData } from "../redux/action/action_user";
import {
   useLocalStorage,
   ACCESS_TOKEN,
   REFRESH_TOKEN,
} from "../utils/useLocalStorage";

const Header = () => {
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);

   const { removeItem: removeAccessToken } = useLocalStorage(ACCESS_TOKEN);
   const { removeItem: removeRefreshToken } = useLocalStorage(REFRESH_TOKEN);
   const { getItem: getRefreshToken } = useLocalStorage(REFRESH_TOKEN);
   const { getItem: getAcessToken } = useLocalStorage(ACCESS_TOKEN);
   const { setItem: saveAcessToken } = useLocalStorage(ACCESS_TOKEN);
   const { setItem: saveRefreshToken } = useLocalStorage(REFRESH_TOKEN);

   const refreshToken = getRefreshToken();
   const accessToken = getAcessToken();

   const handleLogout = () => {
      removeAccessToken();
      removeRefreshToken();
      dispatch(removeUserData());
   };

   const updateToken = async () => {
      try {
         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/user/api/token/refresh/",
            {
               method: "POST",
               body: JSON.stringify({
                  refresh: getRefreshToken(),
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            const data = await response.json();

            // saves access token and refresh token into localStorage
            saveAcessToken(data.access);
            saveRefreshToken(data.refresh);
         } else {
            throw new Error("There was a login problem");
         }
      } catch (error) {
         console.log(error);
      }
   };

   // refreshes token in every 4 minute
   useEffect(() => {
      let fourMinutes = 1000 * 60 * 4;
      let interval = setInterval(() => {
         if (accessToken && refreshToken) {
            updateToken();
         }
      }, fourMinutes);
      return () => clearInterval(interval);
   }, [loading, accessToken, refreshToken]);

   return (
      <div>
         <Link to="/">Home</Link>
         <span> | </span>
         <Link to="/login">Login</Link>
         {user.username !== "" && (
            <>
               <span> | </span>
               <p onClick={handleLogout}>Logout</p>
            </>
         )}
      </div>
   );
};

export default Header;
