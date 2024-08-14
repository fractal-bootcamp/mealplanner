import React, { useState } from "react";
import {
  Recipe,
  Step,
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

  const [categoryInput, setCategoryInput] = useState<Category["name"]>("Fruit");
  const [stepInput, setStepInput] = useState<string>("");

  const [showPopup, setShowPopup] = useState<boolean>(false);

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

  const getUnitLabel = (unit: string): string => {
    return unit === "unit" ? "unit" : `${unit}s`;
  };

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    recognizeUnit(input);
  };

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

    setShowPopup(true);
  };

  const resetForm = () => {
    setTitle("Add Title");
    setIsEditing(false);
    setInputValue("");
    setNotes("");
    setIngredients([]);
    setSteps([]);
    setIngredientInput("");
    setAmountInput("");
    setUnitInput("unit");
    setCategoryInput("Fruit");
    setStepInput("");
  };

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
        resetForm();
        break;
      default:
        break;
    }
    if (action !== "goBack") {
      setShowPopup(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 w-full max-w-screen-lg mx-auto bg-sky-500">
      <div className="bg-sky-700 text-white p-4 rounded-lg shadow-lg w-full">
        <h2 className="font-supermercado text-3xl text-center">
          Create your recipe
        </h2>

        <div className="mt-4">
          <div className="bg-sky-400 p-4 flex items-center justify-between rounded">
            {isEditing ? (
              <input
                type="text"
                placeholder="Write a Title"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded text-black w-full"
              />
            ) : (
              <h2 className="text-xl">{title}</h2>
            )}
            <button
              onClick={isEditing ? handleSaveClick : handleEditClick}
              className="bg-green-500 text-white p-2 rounded ml-2 border-4 border-slate-900"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg">Ingredients</h3>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Enter amount, unit, and ingredient (e.g., 2 cups flour)"
                value={ingredientInput}
                onChange={handleIngredientInputChange}
                className="border border-gray-300 p-2 rounded text-black w-full"
              />
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <input
                  type="text"
                  placeholder="Amount"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded text-black w-full sm:w-1/3"
                />
                <select
                  value={unitInput}
                  onChange={(e) => setUnitInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded text-black w-full sm:w-1/3"
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
                </select>
                <input
                  type="text"
                  placeholder="Category"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded text-black w-full sm:w-1/3"
                />
                <button
                  onClick={handleAddIngredient}
                  className="bg-green-500 text-white p-2 rounded mt-2 border-4 border-slate-900"
                >
                  Add Ingredient
                </button>
              </div>

              <ul className="mt-4">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 rounded mb-2 flex items-center justify-between"
                  >
                    {`${ingredient.ingredient.amount} ${getUnitLabel(
                      ingredient.ingredient.unit
                    )} ${ingredient.ingredient.name}`}
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="bg-red-500 text-white p-2 rounded border-4 border-slate-900"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg">Steps</h3>
            <textarea
              placeholder="Describe each step"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              className="border border-gray-300 p-2 rounded text-black w-full"
            />
            <button
              onClick={handleAddStep}
              className="bg-green-500 text-white p-2 rounded mt-2 border-4 border-slate-900"
            >
              Add Step
            </button>
            <ul className="mt-4">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded mb-2 flex items-center justify-between"
                >
                  {step.content}
                  <button
                    onClick={() => handleRemoveStep(index)}
                    className="bg-red-500 text-white p-2 rounded border-4 border-slate-900"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <textarea
              placeholder="Add any additional notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-300 p-2 rounded text-black w-full"
            />
          </div>

          <button
            onClick={handleSaveRecipe}
            className="bg-blue-500 text-white p-2 rounded mt-4 border-4 border-slate-900"
          >
            Save Recipe
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="mb-4">Recipe saved successfully!</p>
            <button
              onClick={() => handlePopupButtonClick("seeRecipe")}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              See Recipe
            </button>
            <button
              onClick={() => handlePopupButtonClick("seeShoppingList")}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              See Shopping List
            </button>
            <button
              onClick={() => handlePopupButtonClick("goBack")}
              className="bg-gray-500 text-white p-2 rounded mr-2"
            >
              Go Back
            </button>
            <button
              onClick={() => handlePopupButtonClick("makeNew")}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Make New Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCreator;
