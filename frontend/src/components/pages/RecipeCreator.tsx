import React, { useState } from "react";

//confirm interfaces with team
import {
  Recipe,
  Step,
  Ingredient,
  RecipeIngredient,
  Recipes,
} from "../../../../shared/interfaces";

const RecipeCreator = () => {
  // (1) Add, edit and save Title
  //IMPORTANT: when it comes to the interface, title is there "name"
  const [title, setTitle] = useState("Add Title");
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // (2) Add and remove ingredients
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");

  // (3) Add and remove steps
  const [steps, setSteps] = useState([]);
  const [stepInput, setStepInput] = useState("");

  // (4) Save Recipe
  const [recipe, setRecipe] = useState({});

  // (1) Add, edit and save Title functions
  const handleSaveClick = () => {
    setTitle(inputValue);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setInputValue(title);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // (2) Add and remove ingredients functions
  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  const handleIngredientInputChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // (3) Add and remove steps functions
  const handleAddStep = () => {
    if (stepInput.trim() !== "") {
      setSteps([...steps, stepInput]);
      setStepInput("");
    }
  };

  const handleStepInputChange = (e) => {
    setStepInput(e.target.value);
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // (4) Save Recipe
  const handleClick = () => {
    console.log("Save Recipe");
    // when saved, recipe should be saved to the database
  };

  return (
    <>
      <div>
        <div className="flex justify-between w-full h-full">
          <div className="bg-slate-600 w-96 p-4">
            <h1>Create your recipe</h1>

            {/* // (1) Add, edit and save Title */}
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

            {/* // (2) Add and remove ingredients */}
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Add ingredient"
                  value={ingredientInput}
                  onChange={handleIngredientInputChange}
                  className="border border-gray-300 p-2 rounded text-black mr-2"
                />
                <button
                  onClick={handleAddIngredient}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-col">
                {ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 p-2 mb-1 rounded"
                  >
                    {ing}
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="ml-2 bg-red-500 text-white p-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* // ?? Add and remove photo */}
          <div className="bg-slate-600 w-96 p-4">
            <div>
              <div className="border-4 border-blue-900">
                <div className="w-24 h-24 border-4 border-yellow-500">
                  {" "}
                  <img /> <h3>ADD PHOTO?</h3>
                </div>
              </div>

              <div className="bg-slate-700 text-white mt-4">
                <h2>Instructions</h2>
              </div>

              {/* // (3) Add and remove steps */}
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Add step"
                    value={stepInput}
                    onChange={handleStepInputChange}
                    className="border border-gray-300 p-2 rounded text-black mr-2"
                  />
                  <button
                    onClick={handleAddStep}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-200 p-2 mb-1 rounded"
                    >
                      {step}
                      <button
                        onClick={() => handleRemoveStep(index)}
                        className="ml-2 bg-red-500 text-white p-1 rounded"
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
      </div>

      {/* // (4) Save Recipe */}
      <div>
        <button
          onClick={handleClick}
          className="w-24 h-24 border-4 text-white border-yellow-500"
        >
          Save Recipe
        </button>
      </div>
    </>
  );
};
export default RecipeCreator;
