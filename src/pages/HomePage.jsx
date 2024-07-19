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
import MealCard from "../components/MealCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
   const [paginatorData, setPaginatorData] = useState({
      count: null,
      next: null,
      previous: null,
   });

   const getMeals = async () => {
      try {
         let response = await api.get("/recipes/");

         if (response.status === 200) {
            const data = response.data;
            setMealData(data.results);
            setPaginatorData({
               count: data.count,
               next: data.next,
               previous: data.previous,
            });

            console.log("this is data: ", response.data);
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
      <Container>
         <Row>
            <h1>This is home page {user.username}</h1>
            <button onClick={getMeals}>Get meals</button>
         </Row>

         <Row>
            {mealData &&
               mealData.map((meal) => (
                  // <li key={meal.idMeal}>{meal.strMeal}</li>
                  <Col
                     className="mb-3 d-flex justify-content-center"
                     sm={6}
                     md={4}
                     lg={3}
                  >
                     <MealCard key={meal.idMeal} meal={meal} />
                  </Col>
               ))}
         </Row>
      </Container>
   );
};

export default HomePage;
