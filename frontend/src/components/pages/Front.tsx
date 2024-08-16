import React, { useState } from "react";
import Recipes from "./Recipes";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
// import frontImage from "../../assets/manna.jpg";
// import frontImageKawaii from "../../assets/frontIcon.png";
import frontImage from "../../assets/frontImage.png";

const Front = () => {
  // Initialize with no view (image and title visible by default)
  const [view, setView] = useState<null | string>(null);

  // Event handler to change the view
  const handleViewChange = (newView: string) => {
    // Toggle the view if the button is clicked again
    setView((prevView) => (prevView === newView ? null : newView));
  };

  return (
    <div className="fixed bg-sky-400 w-full h-screen flex flex-col overflow-y-auto">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-sky-600 text-white p-4 flex justify-center">
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950  font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("recipes")}
        >
          recipes
        </button>
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 px-4  font-mono font-semibold text-lg py-2"
          onClick={() => handleViewChange("calendar")}
        >
          calendar
        </button>
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 px-4 py-2  font-mono font-semibold text-lg"
          onClick={() => handleViewChange("shopping")}
        >
          shopping
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
                    src={frontImage}
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
        {view === "recipes" && <Recipes />}
        {view === "calendar" && <MealCalendar />}
        {view === "shopping" && <Shopping />}
      </div>
    </div>
  );
};

export default Front;
