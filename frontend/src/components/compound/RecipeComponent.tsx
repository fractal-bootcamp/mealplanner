import React from "react";

type Recipe = {
  name: string;
  instructions: string[];
  notes: string;
  RecipeIngredients: RecipeIngredient[];
};

type RecipeIngredient = {
  ingredient: {
    name: string; // Add more details if needed
  };
  amount: number;
  unit: string;
};

type RecipeComponentProps = {
  recipe: Recipe;
};

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe }) => {
  return (
    <div className="popup">
      <h2 className="font-bold py-3 text-center">{recipe.name}</h2>
      <h3 className="font-semibold py-2">Ingredients:</h3>
      <ul>
        {recipe.RecipeIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} of{" "}
            {ingredient.ingredient.name}
          </li>
        ))}
      </ul>
      <h3 className="font-semibold py-2">Instructions:</h3>
      <ul>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <h3 className="font-semibold py-2">Notes:</h3>
      <p>{recipe.notes}</p> {/* Render notes as a paragraph */}
    </div>
  );
};

export default RecipeComponent;
