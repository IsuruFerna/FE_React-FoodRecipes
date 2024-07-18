import { Route, useNavigate } from "react-router-dom";

import React from "react";

const PrivateRoute = ({ path, element: Component, ...rest }) => {
   const isAuthenticated = true;
   const navigate = useNavigate();

   if (!isAuthenticated) {
      navigate("/login");
      console.log("user not authenticated!");
      return null;
   }

   return <Component {...rest} />;
};

export default PrivateRoute;
