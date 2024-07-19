import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./card.css";

const MealCard = ({ meal }) => {
   return (
      <Card
         sx={{
            maxWidth: 345,
            display: "flex",
            flexDirection: "column",
         }}
      >
         <CardActionArea>
            <CardMedia
               component="img"
               height="140"
               image={meal.strMealThumb}
               alt="green iguana"
            />
            <CardContent
               className="card-text-overflow"
               sx={{ height: "150px" }}
            >
               <Typography gutterBottom variant="h6" component="div">
                  {meal.strMeal}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {meal.strInstructions.substring(0, 100) + "..."}
               </Typography>
            </CardContent>
         </CardActionArea>

         <CardActions sx={{ marginTop: "auto" }}>
            <Button size="small" color="primary">
               Share
            </Button>
         </CardActions>
      </Card>
   );
};

export default MealCard;
