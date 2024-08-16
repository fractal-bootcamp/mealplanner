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
      case "create recipe":
        return createNewRecipe;
      default:
        return cookingBowl;
    }
  };

  const handleOnView = (view: string) => {
    setView(view);
  };

  return (
    <div className=" pt-8 overflow-y-auto bg-sky-400 flex flex-col min-h-screen w-full max-w-screen-lg mx-auto px-3">
      {/* Logo and buttons section */}
      <div className="p-4 flex flex-row items-center justify-between">
        {/* "Your recipes" button */}
        <button
          className="py-2 px-4 font-mono text-justify-center font-semibold text-md bg-blue-500 h-24 w-28 text-white rounded-3xl border-8 border-b-blue-800 border-l-blue-950"
          onClick={() => handleOnView("lists")}
        >
          your recipes
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center rounded-full border-8 border-fuchsia-300">
          <img
            src={getIconSrc()}
            alt="Current View Icon"
            className="w-28 h-28 p-2 rounded-full border-1 border-fuchsia-300 object-cover"
          />
        </div>

        {/* "New" button */}
        <button
          className="py-2 px-4 font-mono font-semibold text-md bg-fuchsia-400  h-24 w-28 text-white rounded-3xl border-8 border-b-fuchsia-700 border-l-fuchsia-950"
          onClick={() => handleOnView("create recipe")}
        >
          new recipe
        </button>
      </div>

      {/* Conditional rendering based on view */}
      <div className="flex-grow px-3">
        {view === "lists" && <AllRecipes />}
        {view === "create recipe" && <RecipeCreator />}
      </div>
    </div>
  );
};

export default Recipes;
