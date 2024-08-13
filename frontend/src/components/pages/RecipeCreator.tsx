import React, { useState } from "react";
import {
  Recipe,
  Step,
  Ingredient,
  RecipeIngredient,
  ShoppingList,
  Category,
} from "../../../../shared/interfaces";

const RecipeCreator: React.FC = () => {
  const [title, setTitle] = useState<string>("Add Title");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");
  const [preparationInput, setPreparationInput] = useState<string>("");
  const [categoryInput, setcategoryInput] = useState<Category["name"]>("Fruit");

  const [stepInput, setStepInput] = useState<string>("");

  // Title functions
  const handleSaveClick = (): void => {
    setTitle(inputValue);
    setIsEditing(false);
  };

  const handleEditClick = (): void => {
    setInputValue(title);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Ingredient functions
  const handleAddIngredient = (): void => {
    if (ingredientInput.trim() !== "" && amountInput.trim() !== "") {
      const newIngredient: RecipeIngredient = {
        ingredient: {
          name: ingredientInput,
          category: { name: categoryInput, description: "" },
          amount: parseFloat(amountInput),
          notes: "",
        },
        amount: parseFloat(amountInput),
        preparation: preparationInput,
      };
      setIngredients([...ingredients, newIngredient]);
      setIngredientInput("");
      setAmountInput("");
      setPreparationInput("");
    }
  };

  const handleRemoveIngredient = (index: number): void => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Step functions
  const handleAddStep = (): void => {
    if (stepInput.trim() !== "") {
      const newStep: Step = {
        content: stepInput,
        ingredients: [],
      };
      setSteps([...steps, newStep]);
      setStepInput("");
    }
  };

  const handleRemoveStep = (index: number): void => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Save Recipe
  const handleSaveRecipe = (): void => {
    const recipe: Recipe = {
      name: title,
      instructions: steps,
      notes: notes,
      RecipeIngredients: ingredients,
    };

    const shoppingList: ShoppingList = {
      ingredients: ingredients.map((ri) => ri.ingredient),
    };

    console.log("Recipe:", recipe);
    console.log("Shopping List:", shoppingList);
    // Implement save to database logic here
  };

  return (
    <div>
      <div className="flex justify-between w-full h-full">
        <div className="bg-slate-600 w-96 p-4">
          <h1>Create your recipe</h1>

          {/* Title */}
          <div className="bg-slate-400 p-4 flex items-center justify-between">
            {isEditing ? (
              <input
                type="text"
                placeholder="Write a Title"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded text-black"
              />
            ) : (
              <h2>{title}</h2>
            )}
            <button
              onClick={isEditing ? handleSaveClick : handleEditClick}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Ingredients List */}
          <div className="mt-4">
            <h3>Ingredients</h3>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Preparation"
                value={preparationInput}
                onChange={(e) => setPreparationInput(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black"
              />
              <select
                value={categoryInput}
                onChange={(e) =>
                  setcategoryInput(e.target.value as Category["name"])
                }
                className="border border-gray-300 p-2 rounded text-black"
              >
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Meat">Meat</option>
                <option value="Dairy">Dairy</option>
                <option value="Grain">Grain</option>
                <option value="Spice">Spice</option>
                <option value="Herb">Herb</option>
                <option value="Fats and Oils">Fats and Oils</option>
              </select>
              <button
                onClick={handleAddIngredient}
                className="bg-green-500 text-white p-2 rounded"
              >
                Add Ingredient
              </button>
            </div>
            <div className="mt-2">
              {ingredients.map((ing, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 p-2 mb-1 rounded"
                >
                  <span>
                    {ing.ingredient.name} - {ing.amount}
                  </span>
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-600 w-96 p-4">
          <div>
            <div className="border-4 border-blue-900">
              <div className="w-24 h-24 border-4 border-yellow-500">
                <img alt="" /> <h3>ADD PHOTO?</h3>
              </div>
            </div>

            <div className="bg-slate-700 text-white mt-4">
              <h2>Instructions</h2>
            </div>

            {/* Steps List */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add step"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black w-full"
              />
              <button
                onClick={handleAddStep}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Add Step
              </button>
              <div className="mt-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-200 p-2 mb-1 rounded"
                  >
                    <span>{step.content}</span>
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <h3>Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black w-full"
          rows={4}
        />
      </div>

      {/* Save Recipe */}
      <div className="mt-4">
        <button
          onClick={handleSaveRecipe}
          className="w-full bg-blue-500 text-white p-4 rounded"
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCreator;
