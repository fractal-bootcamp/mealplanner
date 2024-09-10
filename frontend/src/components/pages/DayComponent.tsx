import React from "react";
import "./DayComponent.css";

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

export interface Cart {
  recipeIngredients: RecipeIngredient[];
}
const DayComponent = ({
  day,
  date,
  cart,
  setCart,
  onClose,
}: {
  day: Day;
  date: Date;
  cart: Cart;
  setCart: (cart: Cart) => void;
  onClose: () => void;
}) => {
  return (
    <div className="relative bg-sky-400 text-md max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg">
      <div className="relative">
        <h2 className="text-2xl font-bold mb-4">
          {date.toDateString()}
          {/* <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full border-2 border-red-800"
          >
            ✕
          </button> */}
        </h2>
        {day.Meals.map((meal) => (
          <MealComponent
            key={meal.mealId}
            meal={meal}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
};

const MealComponent = ({
  meal,
  cart,
  setCart,
}: {
  meal: Meal;
  cart: Cart;
  setCart: (cart: Cart) => void;
}) => {
  return (
    <div className="bg-amber-300 p-4 mb-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{meal.mealName}</h2>
      {meal.recipes.map((recipe, index) => (
        <RecipeComponent
          key={index}
          recipe={recipe}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
};

const RecipeComponent = ({
  recipe,
  cart,
  setCart,
}: {
  recipe: Recipe;
  cart: Cart;
  setCart: (cart: Cart) => void;
}) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <RecipeHeader recipe={recipe} />
      <RecipeIngredients recipe={recipe} cart={cart} setCart={setCart} />
      <RecipeInstructions recipe={recipe} />
    </div>
  );
};

const RecipeHeader = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="bg-lime-200 p-2 mb-2 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{recipe.name}</h3>
      {recipe.URL && (
        <a href={recipe.URL} className="text-blue-500 underline">
          View Recipe
        </a>
      )}
    </div>
  );
};

const RecipeIngredients = ({
  recipe,
  cart,
  setCart,
}: {
  recipe: Recipe;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) => {
  return (
    <div className="bg-green-500 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
      <ul className="list-disc pl-5">
        {recipe.RecipeIngredients.map((recipeIngredient, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>
              {recipeIngredient.ingredient.name} {recipeIngredient.amount}{" "}
              {recipeIngredient.unit}
            </span>
            <button
              onClick={() => {
                setCart((prevCart) => ({
                  recipeIngredients: [
                    ...prevCart.recipeIngredients,
                    recipeIngredient,
                  ],
                }));
              }}
              className="bg-cyan-100 text-black px-2 py-1 rounded-full"
              title="Add to cart"
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecipeInstructions = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="bg-sky-300 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">Instructions</h4>
      <ol className="list-decimal pl-5">
        {recipe.instructions.map((instruction, index) => (
          <li key={index} className="mb-1">
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DayComponent;
