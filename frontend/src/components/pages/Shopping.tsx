import React, { useState } from "react";
import {
  Recipe,
  Ingredient,
  Category,
  RecipeIngredient,
  Recipes,
  ShoppingList,
} from "../../../../shared/interfaces";
import seeAllList from "../../assets/seeAllList.png";
import createNewList from "../../assets/createNewList.png";
import shoppingIcon from "../../assets/shoppingIcon.png";

import Lists from "../compound/Shopping/Lists";
import FinalListCreator from "../compound/Shopping/FinalListCreator";
import ShoppingOrder from "../compound/Shopping/ShoppingOrder";

// Define the ShoppingList type
type ShoppingListProps = {
  lists: ShoppingList[];
};

// Initialize the ShoppingList as an empty array
const initialShoppingList: ShoppingList[] = [];

const Shopping = ({ lists }: ShoppingListProps) => {
  const [view, setView] = useState("lists");

  // Determine the icon based on the current view
  const getIconSrc = () => {
    switch (view) {
      case "lists":
        return seeAllList;
      case "create unified list":
        return createNewList;
      case "place a shopping order":
        return shoppingIcon;
      default:
        return seeAllList; // Fallback icon
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
          see all lists
        </button>
        <button
          className="py-4 font-mono font-semibold text-lg bg-fuchsia-400 text-white rounded mb-2 w-72 border-8 border-b-fuchsia-900 border-l-fuchsia-950"
          onClick={() => handleOnView("create unified list")}
        >
          create shopping list
        </button>
        <button
          className="py-4 font-mono font-semibold text-xl bg-yellow-500 text-white rounded w-72 border-8 border-b-yellow-700 border-l-yellow-950"
          onClick={() => handleOnView("place a shopping order")}
        >
          place your order
        </button>
      </div>

      {/* Conditional rendering based on view */}
      <div className="flex-grow mt-4">
        {view === "lists" && <Lists />}
        {view === "create unified list" && <FinalListCreator />}
        {view === "place a shopping order" && <ShoppingOrder />}
      </div>
    </div>
  );
};

export default Shopping;
