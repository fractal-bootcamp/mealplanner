// THIS IS THE MAIN COMPONENT FOR RECIPE CREATOR
// its outputs should be:

// **** RECIPE ****
// type Recipe = {
//     name: string;
//     instructions: string[];
//     notes: string;
//     RecipeIngredients: RecipeIngredient[];
//   };

//   type RecipeIngredient = {
//     ingredient: {
//       // Details about the ingredient (e.g., name, type)
//     };
//     amount: number;
//     unit: string;
//   };

// **** SHOPPING LIST ****
// type ShoppingList = {
//     ingredients: Ingredient[];
//   };

//   type Ingredient = {
//     // Details about the ingredient (e.g., name, amount, unit)
//   };

import React, { useState } from "react";

// interfaces and types
import {
  Recipe,
  RecipeIngredient,
  ShoppingList,
  Category,
} from "../../../../../shared/interfaces";

// API service
import recipeService from "../../../../API/recipeService";

// Popups
import IngredientPopup from "../IngredientPopup";
import StepPopup from "../StepPopup";

const RecipeCreator: React.FC = () => {
  //the title and notes are handled in the same app
  const [title, setTitle] = useState<string>("add title");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // ingredients and steps are handled by popups
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [showIngredientPopup, setShowIngredientPopup] =
    useState<boolean>(false);
  const [showStepPopup, setShowStepPopup] = useState<boolean>(false);

  // states for handling editions/updating
  const [isEditingIngredients, setIsEditingIngredients] =
    useState<boolean>(false);
  const [isEditingSteps, setIsEditingSteps] = useState<boolean>(false);

  const [ingredientToEdit, setIngredientToEdit] =
    useState<RecipeIngredient | null>(null);
  const [stepToEdit, setStepToEdit] = useState<{
    index: number;
    step: string;
  } | null>(null);

  // function from API service
  const { addRecipe } = recipeService;

  // TITLE
  const handleSaveClick = (): void => {
    setTitle(inputValue);
    setIsEditing(false);
  };

  const handleEditClick = (): void => {
    console.log("Clicked");
    setInputValue(title);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // INGREDIENTS
  const handleAddIngredient = (ingredient: RecipeIngredient) => {
    setIngredients([...ingredients, ingredient]);
    console.log("ingredient", ingredient);
    console.log("ingredients", ingredients, ingredient);
    setShowIngredientPopup(false);
  };

  const handleRemoveIngredient = (index: number): void => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleEditIngredient = (index: number) => {
    console.log("Editing ingredient:", ingredients[index]);
    setIngredientToEdit(ingredients[index]);
    setShowIngredientPopup(true);
  };

  const handleUpdateIngredient = (updatedIngredient: RecipeIngredient) => {
    console.log("Updating ingredient:", updatedIngredient);
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient === ingredientToEdit ? updatedIngredient : ingredient
      )
    );
    setIngredientToEdit(null);
    setShowIngredientPopup(false);
  };

  // STEPS
  const handleAddStep = (step: string) => {
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps, step];
      console.log("New step added", step);
      console.log("All the steps now:", updatedSteps);
      return updatedSteps;
    });
    setShowStepPopup(false);
  };

  const handleRemoveStep = (index: number): void => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleEditStep = (index: number) => {
    setStepToEdit({ index, step: steps[index] });
    setShowStepPopup(true);
  };

  const handleUpdateStep = (index: number, updatedStep: string) => {
    setSteps(steps.map((step, i) => (i === index ? updatedStep : step)));
    setStepToEdit(null);
    setShowStepPopup(false);
  };

  // RECIPE
  const handleSaveRecipe = (): void => {
    const recipe: Recipe = {
      name: title,
      instructions: steps,
      notes: notes,
      RecipeIngredients: ingredients,
    };

    // SHOPPING LIST

    const shoppingList: ShoppingList = {
      ingredients: ingredients.map((ri) => ri.ingredient),
    };

    addRecipe(recipe);

    console.log("Recipe:", recipe);
    console.log("Shopping List:", shoppingList);

    setShowIngredientPopup(false);
    setShowStepPopup(false);
  };

  // RESET FORM
  const resetForm = () => {
    setTitle("add title");
    setIsEditing(false);
    setInputValue("");
    setNotes("");
    setIngredients([]);
    setSteps([]);
  };

  // POPUPBUTTON AFTER THE RECIPE IS DONE, IT GIVES YOU THESE THREE OPTIONS
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
      default:
        break;
    }
  };

  return (
    <>
      {/* TITLE */}
      <div className="p-4 min-h-screen flex flex-col bg-sky-400">
        <div className="">
          <div className="mb-2">
            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded text-black w-full"
              />
            ) : (
              <h1 className="text-lg text-sky-900 font-bold py-4 font-mono">
                {title}
              </h1>
            )}
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white p-2 rounded ml-2"
              >
                save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="py-2 font-mono font-semibold text-md rounded-full bg-yellow-500 text-white w-24 border-8 "
              >
                edit
              </button>
            )}
          </div>

          {/* INGREDIENTS */}
          <div className="mb-2">
            <h2 className="text-lg text-sky-900 font-bold py-4 font-mono">
              ingredients
            </h2>
            <button
              onClick={() => setShowIngredientPopup(true)}
              className="bg-green-600 font-mono font-semibold text-white p-2 rounded-full mt-1 border-8 px-4 py-2"
            >
              add ingredient
            </button>
            <ul className="list-disc pl-5 mt-2">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {ingredient.ingredient.name} - {ingredient.amount}{" "}
                    {ingredient.unit}
                  </span>
                  <div className="space-x-1">
                    <button
                      onClick={() => handleEditIngredient(index)}
                      className="bg-fuchsia-400 font-mono rounded-full py-2 mt-2"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-fuchsia-400 font-mono rounded-full py-2 px-4 mt-2"
                    >
                      remove
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {ingredientToEdit === index && (
                      <>
                        <button
                          onClick={() => handleEditIngredient(index)}
                          className="bg-yellow-500 text-white p-2 rounded mt-2"
                        >
                          edit ingredient
                        </button>
                        <button
                          onClick={() => handleRemoveIngredient(index)}
                          className="text-red-500"
                        >
                          remove
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* STEPS  */}
          <div className="mb-2">
            <h2 className="text-lg text-sky-900 font-bold py-2 font-mono">
              steps
            </h2>
            <button
              onClick={() => setShowStepPopup(true)}
              className="bg-blue-600 font-mono font-semibold text-white p-2 rounded-full mt-2 border-8 px-4 py-2"
            >
              add step
            </button>
            <ol className="list-decimal pl-5 mt-2">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="mb-0.5 flex justify-between items-center"
                >
                  <span className="font-mono text-md"> ◗ {step}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditStep(index)}
                      className="bg-fuchsia-400 font-mono rounded-full py-2 mt-2"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="text-fuchsia-400 font-mono rounded-full py-2 px-4 mt-2"
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* NOTES  */}
        <div className="flex flex-col flex-grow mb-4">
          <div className="">
            <h2 className="text-lg text-sky-900 font-bold py-4 font-mono">
              notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-sky-300 border-1 border-gray-300 rounded-xl text-black w-full h-40 overflow-auto"
            />
          </div>
          <button
            onClick={handleSaveRecipe}
            className="bg-fuchsia-500 font-mono font-semibold text-white rounded-full mt-2 border-8 px-4 py-2"
          >
            save recipe!
          </button>
        </div>

        {/* // POPUPS */}
        {/* // INGREDIENT POPUP */}
        {showIngredientPopup && (
          <IngredientPopup
            onClose={() => {
              setShowIngredientPopup(false);
              setIngredientToEdit(null);
            }}
            onAddIngredient={handleAddIngredient}
            onEditIngredient={handleUpdateIngredient}
            ingredientToEdit={ingredientToEdit}
          />
        )}

        {/* // STEP POPUP */}
        {showStepPopup && (
          <StepPopup
            onClose={() => {
              setShowStepPopup(false);
              setStepToEdit(null);
            }}
            onAddStep={handleAddStep}
            onEditStep={handleUpdateStep}
            stepToEdit={stepToEdit}
          />
        )}
      </div>
    </>
  );
};
export default RecipeCreator;
