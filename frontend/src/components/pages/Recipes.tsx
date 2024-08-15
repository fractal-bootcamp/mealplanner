import RecipeCreator from "../compound/RecipeCreator/RecipeCreator";
import AllRecipes from "../compound/RecipeCreator/AllRecipes";
import seeRecipes from "../../assets/readingBook.png";
import createNewRecipe from "../../assets/createNewList.png";
import cookingBowl from "../../assets/frontImage.png";
import React, { useState, useEffect } from "react";

const Recipes = () => {
  const [view, setView] = useState("lists");

  const getIconSrc = () => {
    switch (view) {
      case "lists":
        return seeRecipes;
      case "create recipe": // Changed from "create a recipe" to match handleOnView
        return createNewRecipe;
      default:
        return cookingBowl;
    }
  };

  const handleOnView = (view: string) => {
    setView(view);
  };

  return (
    <div className="fixed bg-sky-400 flex flex-col min-h-screen p-4 w-full max-w-screen-lg mx-auto">
      {/* Buttons and icons section */}
      <div className="p-4 flex flex-col items-center space-y-4">
        {/* Icon */}
        <div className="flex items-center justify-center mb-4 rounded-full border-8 border-fuchsia-300">
          <img
            src={getIconSrc()}
            alt="Current View Icon"
            className="w-32 h-32 p-2 rounded-full border-1 border-fuchsia-300 object-cover"
          />
        </div>

        {/* Buttons */}
        <button
          className="py-4 font-mono font-semibold text-xl bg-blue-500 text-white rounded mb-2 w-72 border-8 border-b-blue-900 border-l-blue-950"
          onClick={() => handleOnView("lists")}
        >
          see your recipes
        </button>
        <button
          className="py-4 font-mono font-semibold text-lg bg-fuchsia-400 text-white rounded mb-2 w-72 border-8 border-b-fuchsia-900 border-l-fuchsia-950"
          onClick={() => handleOnView("create a recipe")}
        >
          create a new recipe
        </button>
      </div>

      {/* Conditional rendering based on view */}
      <div className="flex-grow mt-4">
        {view === "lists" && <AllRecipes />}
        {view === "create recipe" && <h3>recipe creator</h3>}
      </div>
    </div>
  );
};

export default Recipes;
