import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
// import frontImage from "../../assets/manna.jpg";
// import frontImageKawaii from "../../assets/frontIcon.png";
import frontImage from "../../assets/frontImage.png";

import { listOfShoppingLists } from "../../../../shared/sample";

const Front = () => {
  // Initialize with no view (image and title visible by default)
  const [view, setView] = useState<null | string>(null);
  const [shoppingLists, setShoppingLists] = useState<object[]>();
  // Event handler to change the view
  const handleViewChange = (newView: string) => {
    setView((prevView) => (prevView === newView ? null : newView));
  };

  useEffect(() => {
    setShoppingLists(listOfShoppingLists);
    console.log("List of shopping lists", shoppingLists);
  }, []);

  useEffect(() => {
    console.log("Updated list of shopping lists:", shoppingLists);
  }, [shoppingLists]); // Depend on `shoppingLists` to log when it changes

  return (
    <div className="fixed bg-sky-400 w-full h-screen flex flex-col overflow-y-auto">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-sky-600 text-white p-4 flex justify-center space-x-4 z-10">
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("recipes")}
        >
          Recipes
        </button>
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("calendar")}
        >
          Calendar
        </button>
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("shopping")}
        >
          Shopping
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-16 flex-grow flex flex-col w-full mt-0">
        {view === null && (
          <div className="text-white flex flex-col items-center w-full mt-16">
            <div className="flex-grow flex items-center justify-center w-full">
              <div className="text-6xl text-center border-8 rounded-full border-fuchsia-300">
                <img
                  src={frontImage}
                  alt="A group of kawaii elements of traditional Japanese everyday food"
                  className="w-60 h-60 rounded-full border-8 border-fuchsia-300 object-cover"
                />
              </div>
            </div>
            <div className="items-center justify-center mb-8 w-full p-10">
              <h2 className="font-supermercado text-8xl mx-auto text-center">
                Meal Prep
              </h2>
            </div>
          </div>
        )}
        {view === "recipes" && <Recipes />}
        {view === "calendar" && <MealCalendar />}
        {view === "shopping" && <Shopping lists={shoppingLists} />}
      </div>
    </div>
  );
};

export default Front;
