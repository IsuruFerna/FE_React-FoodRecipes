import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   useLocalStorage,
   ACCESS_TOKEN,
   REFRESH_TOKEN,
} from "../utils/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../redux/action/action_user";
import useAxios from "../utils/useAxios";

const HomePage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   let api = useAxios();

   const { getItem: getAccessToken, removeItem: removeAccessToken } =
      useLocalStorage(ACCESS_TOKEN);
   const { getItem: getRefreshToken, removeItem: removeRefreshToken } =
      useLocalStorage(REFRESH_TOKEN);
   const user = useSelector((state) => state.user);

   const logoutUser = () => {
      removeAccessToken();
      removeRefreshToken();
      dispatch(removeUserData());
      navigate("/login");
   };

   const [mealData, setMealData] = useState([]);

   const getMeals = async () => {
      try {
         let response = await api.get("/recipes/");

         if (response.status === 200) {
            setMealData(response.data.data);

            console.log("this is data: ", mealData);
         }
      } catch (error) {
         console.log(error);
         logoutUser();
      }
   };

   useEffect(() => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      // navigate to login page when there is no access token and refresh token
      if (accessToken && refreshToken) getMeals();
      else navigate("/login");

      if (accessToken) {
         console.log("authenticate me");
      }

      if (refreshToken) {
         console.log("refresh me");
      }
   }, []);

   return (
      <div>
         <h1>This is home page {user.username}</h1>
         <button onClick={getMeals}>Get meals</button>

         <ul>
            {mealData.length > 0 &&
               mealData.map((meal) => (
                  <li key={meal.idMeal}>{meal.strMeal}</li>
               ))}
         </ul>
      </div>
   );
};

export default HomePage;
