import React, { useState } from "react";
import RecipeCreator from "./RecipeCreator";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
import frontImageMedieval from "../../assets/manna.jpg";
import frontImageKawaii from "../../assets/frontIcon.png";
import DayComponent from "./DayComponent";

export type DayOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Meal {
  mealId: string;
  mealName: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Special";
  recipes: Recipe[];
}

export interface Recipe {
  name: string;
  URL?: string;
  instructions: string[];
  notes: string;
  RecipeIngredients: RecipeIngredient[];
}

export interface Ingredient {
  name: string;
  category: Category;
  notes: string;
}

//Calculated from the ingredient
export interface RecipeIngredient {
  ingredient: Ingredient;
  notes: string;
  amount: number;
}

export type Category =
  | "Fruit"
  | "Vegetable"
  | "Meat"
  | "Dairy"
  | "Grain"
  | "Spice"
  | "Herb"
  | "Fats and Oils";

export interface Day {
  dayOfTheWeek: DayOfTheWeek;
  Meals: Meal[];
}

const sampleDay: Day = {
  dayOfTheWeek: "Monday",
  Meals: [
    {
      mealId: "1",
      mealName: "Breakfast",
      recipes: [
        {
          name: "Scrambles",
          RecipeIngredients: [
            {
              ingredient: { name: "Eggs", category: "Dairy", notes: "" },
              amount: 2,
              notes: "",
            },
            {
              ingredient: { name: "Milk", category: "Dairy", notes: "" },
              amount: 1,
              notes: "",
            },
          ],
          instructions: ["Scramble the eggs", "Add milk", "Serve"],
          notes: "This is a scrambles recipe",
          URL: "https://www.google.com",
        },
      ],
    },
    {
      mealId: "2",
      mealName: "Lunch",
      recipes: [
        {
          name: "Pancakes",
          RecipeIngredients: [
            {
              ingredient: { name: "Flour", category: "Grain", notes: "" },
              amount: 2,
              notes: "",
            },
          ],
          instructions: ["Mix the flour", "Add milk", "Serve"],
          notes: "This is a pancakes recipe",
          URL: "https://www.google.com",
        },
      ],
    },
    {
      mealId: "3",
      mealName: "Dinner",
      recipes: [
        {
          name: "Steak",
          RecipeIngredients: [
            {
              ingredient: { name: "Steak", category: "Meat", notes: "" },
              amount: 2,
              notes: "",
            },
          ],
          instructions: ["Cook the steak", "Serve"],
          notes: "This is a steak recipe",
          URL: "https://www.google.com",
        },
      ],
    },
  ],
};

const Front = () => {
  // Initialize with no view (image and title visible by default)
  const [view, setView] = useState<null | string>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

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
        {view === "calendar" && (
          <>
            <div className="flex-grow flex flex-col">
              <MealCalendar setSelectedDay={setSelectedDay} />
              {selectedDay ? (
                <DayComponent day={sampleDay} />
              ) : (
                <button>Select a day</button>
              )}
            </div>
          </>
        )}
        {view === "shopping" && <Shopping />}
      </div>
    </div>
  );
};

export default Front;
