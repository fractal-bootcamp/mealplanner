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
  const [unitInput, setUnitInput] = useState<string>("unit");

  const [categoryInput, setcategoryInput] = useState<Category["name"]>("Fruit");
  const [stepInput, setStepInput] = useState<string>("");

  //Pop-up state after the recipe is completed
  const [showPopup, setShowPopup] = useState<boolean>(false); // State for pop-up visibility

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
          unit: unitInput,
          notes: "",
        },
        amount: parseFloat(amountInput),
        unit: unitInput,
      };
      setIngredients([...ingredients, newIngredient]);
      setIngredientInput("");
      setAmountInput("");
      setUnitInput("unit");
    }
  };

  const handleRemoveIngredient = (index: number): void => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Function to recognize units
  const recognizeUnit = (input: string) => {
    const unitRegex = /^([\d./]+)\s*([a-zA-Z]+|)(.*)$/;
    const match = input.match(unitRegex);

    if (match) {
      const [, amount, unit, ingredientName] = match;
      setAmountInput(amount);
      setUnitInput(unit || "unit");
      setIngredientInput(ingredientName.trim());
    } else {
      setIngredientInput(input);
    }
  };

  //Unit helper for plural

  const getUnitLabel = (unit: string): string => {
    return unit === "unit" ? "unit" : `${unit}s`;
  };

  // Handle ingredient input change
  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    recognizeUnit(input);
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

    // Set the popup to show
    setShowPopup(true);

    // Implement save to database logic here
  };

  // Handler for popup buttons
  const handlePopupButtonClick = (action: string) => {
    switch (action) {
      case "seeRecipe":
        console.log("Navigate to recipe view");
        break;
      case "seeShoppingList":
        console.log("Navigate to shopping list view");
        break;
      case "goBack":
        console.log("Navigate back to recipes");
        break;
      case "makeNew":
        console.log("Navigate to new recipe creation");
        break;
      default:
        break;
    }
    setShowPopup(false);
  };

  return (
    <div>
      <div className="flex justify-between w-full h-full">
        <div className="bg-slate-600 w-96 p-4">
          <h2 className="font-bold text-lg">Create your recipe</h2>

          <div className="bg-slate-600 w-96 p-4">
            <div>
              <div className="border-4 border-blue-900">
                <div className="w-24 h-24 border-4 border-yellow-500">
                  <img alt="" /> <h3>ADD PHOTO?</h3>
                </div>
              </div>

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
                    placeholder="Enter amount, unit, and ingredient (e.g., 2 cups flour)"
                    onChange={handleIngredientInputChange}
                    className="border border-gray-300 p-2 rounded text-black"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Amount"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="border border-gray-300 p-2 rounded text-black w-1/3"
                    />
                    <select
                      value={unitInput}
                      onChange={(e) => setUnitInput(e.target.value)}
                      className="border border-gray-300 p-2 rounded text-black w-1/3"
                    >
                      <option value="unit">unit</option>
                      <option value="cup">cup</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                      <option value="oz">oz</option>
                      <option value="g">g</option>
                      <option value="lb">lb</option>
                      <option value="ml">ml</option>
                      <option value="l">l</option>
                      {/* Add more units as needed */}
                    </select>
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredientInput}
                      onChange={(e) => setIngredientInput(e.target.value)}
                      className="border border-gray-300 p-2 rounded text-black w-1/3"
                    />
                  </div>
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
                        {ing.ingredient.name} - {ing.amount}{" "}
                        {getUnitLabel(ing.unit)}
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
      {/* Save Recipe Button */}
      <div className="mt-4">
        <button
          onClick={handleSaveRecipe}
          className="bg-green-500 text-white p-2 rounded"
        >
          Save Recipe
        </button>
      </div>
      // {/* Pop-up Message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Recipe Saved!</h2>
            <p className="mb-4">What would you like to do next?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handlePopupButtonClick("seeRecipe")}
                className="bg-blue-500 text-white p-2 rounded"
              >
                See Recipe
              </button>
              <button
                onClick={() => handlePopupButtonClick("seeShoppingList")}
                className="bg-blue-500 text-white p-2 rounded"
              >
                See Shopping List
              </button>
              <button
                onClick={() => handlePopupButtonClick("goBack")}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Go Back
              </button>
              <button
                onClick={() => handlePopupButtonClick("makeNew")}
                className="bg-green-500 text-white p-2 rounded"
              >
                Make New Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCreator;
