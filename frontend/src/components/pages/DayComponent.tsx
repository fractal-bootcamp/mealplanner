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
    <div className="day-container bg-red-400 text-md">
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        {date.toDateString()}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "22%",
            transform: "scale(0.5)",
            top: "0%",
            color: "white",
            background: "red",
          }}
        >
          ✕
        </button>
      </h1>

      {day.Meals.map((meal) => (
        <MealComponent
          key={meal.mealId}
          meal={meal}
          cart={cart}
          setCart={setCart}
        />
      ))}
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
    <div className="meal-container bg-amber-300">
      <h2 className="meal-title">{meal.mealName}</h2>
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
    <div className="recipe-container ">
      <RecipeHeader recipe={recipe} />
      <RecipeIngredients recipe={recipe} cart={cart} setCart={setCart} />
      <RecipeInstructions recipe={recipe} />
    </div>
  );
};

const RecipeHeader = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="recipe-header bg-lime-200">
      <h3 className="recipe-title">{recipe.name}</h3>
      {recipe.URL && (
        <a href={recipe.URL} className="recipe-link">
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
  setCart: (cart: Cart) => void;
}) => {
  return (
    <div className="recipe-ingredients-container bg-green-500">
      <h4 className="ingredients-title">Ingredients</h4>
      <ul className="recipe-ingredients">
        {recipe.RecipeIngredients.map((recipeIngredient, index) => (
          <li key={index} className="ingredient-item">
            <span>
              {recipeIngredient.ingredient.name} {recipeIngredient.amount}
            </span>
            <button
              onClick={() => {
                setCart({
                  recipeIngredients: [
                    ...cart.recipeIngredients,
                    recipeIngredient,
                  ],
                });
                console.log(cart.recipeIngredients);
              }}
              className="add-to-cart-btn bg-cyan-100"
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
    <div className="recipe-instructions bg-sky-300">
      <h4 className="instructions-title">Instructions</h4>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default DayComponent;
