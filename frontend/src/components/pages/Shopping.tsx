import React, { useState } from "react";
import seeAllList from "../../assets/seeAllList.png";
import createNewList from "../../assets/createNewList.png";
import shoppingIcon from "../../assets/shoppingIcon.png";
import Lists from "../compound/Shopping/Lists";
import FinalListCreator from "../compound/Shopping/FinalListCreator";
import ShoppingOrder from "../compound/Shopping/ShoppingOrder";

// Define the type for lists if not already defined
type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
  amount: number;
  unit: string;
};

type ShoppingLists = {
  [key: string]: Ingredient[];
};

type ShoppingProps = {
  lists: ShoppingLists;
};

const Shopping: React.FC<ShoppingProps> = ({ lists }) => {
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
      {/* Centered container */}
      <div className="flex flex-col items-center justify-center h-full relative">
        {/* Button Container */}
        <div className="flex flex-col items-center space-y-4">
          {/* Top row of buttons */}
          <div className="flex space-x-4 mb-8">
            <div className="w-72" />
          </div>

          {/* Middle row of buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              className="py-4 font-mono font-semibold text-md bg-blue-500 text-white rounded-full border-8 w-28 border-b-blue-900 border-l-blue-950"
              onClick={() => handleOnView("lists")}
            >
              All Lists
            </button>

            {/* Centered Icon */}
            <div className="flex items-center justify-center mb-4 rounded-full border-8 border-fuchsia-300">
              <img
                src={getIconSrc()}
                alt="Current View Icon"
                className="w-32 h-32 p-2 rounded-full border-1 border-fuchsia-300 object-cover"
              />
            </div>

            <button
              className="py-4 font-mono font-semibold text-sm bg-fuchsia-400 text-white rounded-full border-8 w-28 border-b-fuchsia-900 border-l-fuchsia-950"
              onClick={() => handleOnView("create unified list")}
            >
              Create Shopping List
            </button>
          </div>

          {/* Bottom row of buttons */}
          <div className="flex space-x-4">
            <button
              className="py-4 font-mono font-semibold text-md bg-yellow-500 text-white rounded-full border-8 border-b-yellow-700 border-l-yellow-950"
              onClick={() => handleOnView("place a shopping order")}
            >
              Place Your Order
            </button>
          </div>
        </div>

        {/* Render component based on view state */}
        <div className="flex flex-col items-center mt-8">
          {view === "lists" && <Lists lists={lists} />}
          {view === "create unified list" && <FinalListCreator />}
          {view === "place a shopping order" && <ShoppingOrder />}
        </div>
      </div>
    </div>
  );
};

export default Shopping;
