import React, { useState } from "react";

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

const DayComponent = ({ day }: { day: Day }) => {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>{day.dayOfTheWeek}</h1>
      {day.Meals.map((meal) => (
        <MealComponent meal={meal} />
      ))}
    </div>
  );
};

const MealComponent = ({ meal }: { meal: Meal }) => {
  return (
    <div
      style={{
        backgroundColor: "lightgreen",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ fontWeight: "bold" }}> &nbsp; {meal.mealName}</h2>
      {meal.recipes.map((recipe) => (
        <RecipeComponent recipe={recipe} />
      ))}
    </div>
  );
};

const RecipeComponent = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div
      style={{
        backgroundColor: "lightyellow",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <RecipeHeader recipe={recipe} />
      <RecipeIngredients recipe={recipe} />
      <RecipeInstructions recipe={recipe} />
    </div>
  );
};

const RecipeHeader = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
      }}
    >
      <h3 style={{ fontWeight: "bold" }}>{recipe.name}</h3>
      {recipe.URL && <a href={recipe.URL}>Recipe</a>}
    </div>
  );
};

const RecipeIngredients = ({ recipe }: { recipe: Recipe }) => {
  return (
    <ul style={{ borderBottom: "1px solid black" }}>
      {recipe.RecipeIngredients.map((recipeIngredient) => (
        <li>
          {recipeIngredient.ingredient.name} {recipeIngredient.amount}
        </li>
      ))}
    </ul>
  );
};

const RecipeInstructions = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div>
      <ol style={{ listStyleType: "decimal", marginLeft: "20px" }}>
        {recipe.instructions.map((instruction) => (
          <li> &nbsp; {instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default DayComponent;
