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
    <div className="day-container">
      <h1 className="day-title">
        {date.toDateString()}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "#333",
            cursor: "pointer",
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
    <div className="meal-container">
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
  const addAllIngredientsToCart = () => {
    setCart({
      recipeIngredients: [
        ...cart.recipeIngredients,
        ...recipe.RecipeIngredients,
      ],
    });
    console.log(cart);
  };

  return (
    <div className="recipe-container">
      <RecipeHeader recipe={recipe} />
      <RecipeIngredients recipe={recipe} cart={cart} setCart={setCart} />
      <button
        onClick={addAllIngredientsToCart}
        className="add-all-ingredients-btn"
      >
        Add All Ingredients
      </button>
      <RecipeInstructions recipe={recipe} />
    </div>
  );
};

const RecipeHeader = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="recipe-header">
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
    <div className="recipe-ingredients-container">
      <h4 className="ingredients-title">Ingredients</h4>
      <ul className="recipe-ingredients">
        {recipe.RecipeIngredients.map((recipeIngredient, index) => (
          <li key={index} className="ingredient-item">
            <span>
              {recipeIngredient.ingredient.name} ({recipeIngredient.amount})
            </span>
            <button
              onClick={() => {
                setCart({
                  recipeIngredients: [
                    ...cart.recipeIngredients,
                    recipeIngredient,
                  ],
                });
              }}
              className="add-to-cart-btn"
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
    <div className="recipe-instructions">
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
