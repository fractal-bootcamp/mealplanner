import React, { useState } from "react";
import RecipeCreator from "./RecipeCreator";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
import frontImage from "../../assets/manna.jpg";

const Front = () => {
  // Initialize with no view (image and title visible by default)
  const [view, setView] = useState(null);

  // Event handler to change the view
  const handleViewChange = (newView) => {
    // Toggle the view if the button is clicked again
    setView((prevView) => (prevView === newView ? null : newView));
  };

  return (
    <div className="bg-slate-500 w-full h-full">
      <div className="text-white">
        <h2>
          <button onClick={() => handleViewChange("recipes")}>Recipes</button>
          <button onClick={() => handleViewChange("calendar")}>Calendar</button>
          <button onClick={() => handleViewChange("shopping")}>Shopping</button>
        </h2>
        <div className="p-6 font-gothic">
          <h2 className="text-4xl">Meal Planner</h2>
          <h3 className="text-xl w-96 max-w-96">- For all of Us,</h3>
          <h3 className="text-xl w-96 max-w-96">
            the unsubscribed to Manna from Heaven™
          </h3>
        </div>
      </div>
      {view === null && (
        <img
          src={frontImage}
          alt="Manna from Heaven as in a medieval illustration"
          className="w-full h-auto"
        />
      )}
      <div>
        {view === "recipes" && <RecipeCreator />}
        {view === "calendar" && <MealCalendar />}
        {view === "shopping" && <Shopping />}
      </div>
    </div>
  );
};

export default Front;
