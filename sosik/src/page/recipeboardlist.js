import React from "react";
import Recipebutton from "../component/recipeboard/recipelist/Recipebutton";
import Recipecard from "../component/recipeboard/recipelist/Recipecard";
import Recipesearch from "../component/recipeboard/recipelist/Recipesearch";

function Recipeboardinfo() {
  return (
    <div>
      <Recipebutton></Recipebutton>
      <Recipesearch></Recipesearch>
      <Recipecard></Recipecard>
    </div>
  );
}

export default Recipeboardinfo;
