import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
   useLocalStorage,
   ACCESS_TOKEN,
   REFRESH_TOKEN,
} from "../utils/useLocalStorage";

const HomePage = () => {
   const navigate = useNavigate();

   const { getItem: getAccessToken } = useLocalStorage(ACCESS_TOKEN);
   const { getItem: getRefreshToken } = useLocalStorage(REFRESH_TOKEN);

   // const fetchAuthenticate = async () => {
   //    try {
   //       let response = await fetch(process.env.REACT_APP_BE_URL, {});
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   useEffect(() => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      // navigate to login page when there is no access token and refresh token
      if (accessToken === undefined && refreshToken === undefined)
         navigate("/login");

      if (accessToken) {
         console.log("authenticate me");
      }

      if (refreshToken) {
         console.log("refresh me");
      }
   }, [getAccessToken, getRefreshToken, navigate]);

   return (
      <div>
         <h1>This is home page</h1>
      </div>
   );
};

export default HomePage;
