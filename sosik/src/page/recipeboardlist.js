import React from "react";
import Recipebutton from "../component/community/recipeboard/recipelist/Recipebutton";
import Recipecard from "../component/community/recipeboard/recipelist/Recipecard";
import Recipesearch from "../component/community/recipeboard/recipelist/Recipesearch";

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
