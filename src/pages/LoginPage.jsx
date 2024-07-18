import React, { useState } from "react";

const LoginPage = () => {
   const [loginData, setLoginData] = useState({
      username: "",
      password: "",
   });

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
