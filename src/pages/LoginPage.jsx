import React, { useState } from "react";
import {
   useLocalStorage,
   ACCESS_TOKEN,
   REFRESH_TOKEN,
} from "../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/action/action_user";

const LoginPage = () => {
   const [loginData, setLoginData] = useState({
      username: "",
      password: "",
   });

   const [userData, setUserData] = useState(null);

   const navigate = useNavigate();

   const { setItem: saveAcessToken } = useLocalStorage(ACCESS_TOKEN);
   const { setItem: saveRefreshToken } = useLocalStorage(REFRESH_TOKEN);

   const dispatch = useDispatch();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/user/api/token/",
            {
               method: "POST",
               body: JSON.stringify(loginData),
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            const data = await response.json();
            console.log("this is token: ", data);

            // saves access token and refresh token into localStorage
            saveAcessToken(data.access);
            saveRefreshToken(data.refresh);

            const decode = jwtDecode(data.access);
            console.log("this is decoded data: ", decode);

            dispatch(getUserData(decode));

            navigate("/");
         } else {
            throw new Error("There was a login problem");
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = (e) => {
      const target = e.target;
      setLoginData({
         ...loginData,
         [target.name]: target.value,
      });
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="username"
               value={loginData.username}
               onChange={handleChange}
               placeholder="Enter Username"
            />
            <input
               type="text"
               name="password"
               value={loginData.password}
               onChange={handleChange}
               placeholder="Enter Password"
            />
            <input type="submit" value="Login" />
         </form>
      </div>
   );
};

export default LoginPage;
