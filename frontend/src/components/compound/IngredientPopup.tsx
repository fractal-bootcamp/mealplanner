import React, { useState } from "react";
import { RecipeIngredient, Category } from "../../../../shared/interfaces";

interface IngredientPopupProps {
  onClose: () => void;
  onAddIngredient: (ingredient: RecipeIngredient) => void;
}

const IngredientPopup: React.FC<IngredientPopupProps> = ({
  onClose,
  onAddIngredient,
}) => {
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");
  const [unitInput, setUnitInput] = useState<string>("unit");
  const [categoryInput, setCategoryInput] = useState<Category["name"]>("Fruit");

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

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    recognizeUnit(e.target.value);
  };

  const handleAddIngredient = () => {
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
      onAddIngredient(newIngredient);
      setIngredientInput("");
      setAmountInput("");
      setUnitInput("unit");
    }
  };

  const handleEditIngredient = (ingredientToEdit) => {
    if (ingredientToEdit) {
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg mb-2">Add Ingredient</h3>
        <input
          type="text"
          placeholder="Enter amount, unit, and ingredient (e.g., 2 cups flour)"
          value={ingredientInput}
          onChange={handleIngredientInputChange}
          className="border border-gray-300 p-2 rounded text-black w-full mb-2"
        />
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-2">
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
        </div>
        <button
          onClick={handleAddIngredient}
          className="bg-green-500 text-white p-2 rounded mt-2 w-full"
        >
          Add Ingredient
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded mt-2 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default IngredientPopup;
