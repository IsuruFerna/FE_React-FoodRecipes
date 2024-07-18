import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const navigate = useNavigate();
   const user = useSelector((state) => state);

   console.log("this is env secret: ", user);

   useEffect(() => {
      if (!isAuthenticated) navigate("/login");
   });

   return (
      <div>
         <h1>This is home page</h1>
      </div>
   );
};

export default HomePage;
