import React from "react";
import { XIcon, ShoppingCartIcon } from "lucide-react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  amount: number;
  unit: string;
};

type Cart = {
  recipeIngredients: Ingredient[];
};

interface ShoppingOrderPopupProps {
  onClose: () => void;
  cart: Cart;
}

const ShoppingOrderPopup: React.FC<ShoppingOrderPopupProps> = ({
  onClose,
  cart,
}) => {
  const groupedIngredients = cart.recipeIngredients.reduce(
    (acc, item) => {
      const category = item.ingredient.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, Ingredient[]>
  );

  const sortedCategories = Object.keys(groupedIngredients).sort();

  return (
    <div className="fixed inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center z-50 font-mono">
      <div className="p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto bg-blue-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">
            your shopping list
          </h2>
          <button
            onClick={onClose}
            className=" bg-red-400 text-white font-bold hover:bg-red-500"
          >
            <XIcon size={24} />
          </button>
        </div>
        <div className="mb-4">
          <ShoppingCartIcon size={48} className="text-green-500 mx-auto" />
        </div>
        {sortedCategories.length > 0 ? (
          sortedCategories.map((category) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <ul className="list-disc pl-5">
                {groupedIngredients[category].map((item, index) => (
                  <li key={index} className="mb-1">
                    {item.ingredient.name} - {item.amount} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Your shopping list is empty
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShoppingOrderPopup;
