import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
import frontImage from "../../assets/frontImage.png";
import { RecipeIngredient } from "../types/mealTypes";
import { listOfShoppingLists } from "../../../../shared/sample";
import { Day } from "./DayComponent";

type Cart = {
  recipeIngredients: RecipeIngredient[];
};

const Front = () => {
  const [view, setView] = useState<null | string>(null);
  const [shoppingLists, setShoppingLists] = useState<object[]>();
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [cart, setCart] = useState<Cart>({ recipeIngredients: [] });

  const handleViewChange = (newView: string) => {
    setView((prevView) => (prevView === newView ? null : newView));
  };

  useEffect(() => {
    setShoppingLists(listOfShoppingLists);
    console.log("List of shopping lists", shoppingLists);
  }, []);

  useEffect(() => {
    console.log("Updated list of shopping lists:", shoppingLists);
  }, [shoppingLists]);

  useEffect(() => {
    console.log("FRONT Cart has been updated", cart);
  }, [cart]);

  const clearCart = () => {
    setCart({ recipeIngredients: [] });
  };

  return (
    <div className="fixed bg-sky-400 w-full h-screen flex flex-col overflow-y-auto">
      {/* Fixed Navbar */}
      <div className="fixed w-full p-2\ top-0 left-0 right-0 bg-sky-600 text-white p-4 flex justify-center space-x-4 z-10">
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

      {/* Cart Display */}
      <div className="fixed bottom-0 right-0 bg-white p-4 rounded-tl-lg shadow-lg z-20">
        <h3 className="font-bold mb-2">
          Cart ({cart.recipeIngredients.length})
        </h3>
        <ul className="max-h-40 overflow-y-auto mb-2">
          {cart.recipeIngredients.map((item, index) => (
            <li key={index} className="text-sm">
              {item.ingredient.name} ({item.amount})
            </li>
          ))}
        </ul>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Clear Cart
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
        {view === "calendar" && <MealCalendar cart={cart} setCart={setCart} />}
        {view === "shopping" && (
          <Shopping setCart={setCart} cart={cart} lists={shoppingLists} />
        )}
      </div>
    </div>
  );
};

export default Front;
