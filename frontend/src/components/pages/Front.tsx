import React, { useState } from "react";
import RecipeCreator from "./RecipeCreator";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
import frontImageMedieval from "../../assets/manna.jpg";
import frontImageKawaii from "../../assets/frontIcon.png";

const Front = () => {
  // Initialize with no view (image and title visible by default)
  const [view, setView] = useState<null | string>(null);

  // Event handler to change the view
  const handleViewChange = (newView: string) => {
    // Toggle the view if the button is clicked again
    setView((prevView) => (prevView === newView ? null : newView));
  };

  return (
    <div className="fixed bg-sky-500 w-full h-screen flex flex-col overflow-y-auto">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-sky-700 text-white p-4 flex justify-around">
        <button
          className="bg-green-500 border-4 border-b-slate-900 border-l-slate-900 px-4 py-2"
          onClick={() => handleViewChange("recipes")}
        >
          Recipes
        </button>
        <button
          className="bg-green-500 border-4 border-b-slate-900 border-l-slate-900 px-4 py-2"
          onClick={() => handleViewChange("calendar")}
        >
          Calendar
        </button>
        <button
          className="bg-green-500 border-4 border-b-slate-900 border-l-slate-900 px-4 py-2"
          onClick={() => handleViewChange("shopping")}
        >
          Shopping
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-16 flex-grow flex flex-col w-full">
        {view === null && (
          <>
            {/* Default View Content */}
            <div className="text-white mt-16 flex flex-col items-center w-full">
              <div className="flex-grow flex items-center justify-center w-full">
                <div className="text-6xl text-center border-8 rounded-full  border-fuchsia-300 ">
                  {" "}
                  <img
                    src={frontImageKawaii}
                    alt="A group of kawaii elements of traditional japanese everyday food"
                    className="w-60 h-60 rounded-full border-8 border-fuchsia-300 object-cover"
                  />
                </div>
              </div>
              <div className="items-center justify-center mb-8 w-full p-10">
                <h2 className="font-supermercado text-8xl w-60p-8 mx-auto text-center">
                  Meal Prep
                </h2>
              </div>
            </div>
          </>
        )}
        {view === "recipes" && <RecipeCreator />}
        {view === "calendar" && <MealCalendar />}
        {view === "shopping" && <Shopping />}
      </div>
    </div>
  );
};

export default Front;
