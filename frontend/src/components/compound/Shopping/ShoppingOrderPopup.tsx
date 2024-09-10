import React from "react";
import { XIcon, ShoppingCartIcon } from "lucide-react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon size={24} />
          </button>
        </div>
        <div className="mb-4">
          <ShoppingCartIcon size={48} className="text-green-500 mx-auto" />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {cart.recipeIngredients.length > 0 ? (
            cart.recipeIngredients.map((item, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                <p>
                  {item.ingredient.name} - {item.amount} {item.unit}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {item.ingredient.category}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>
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
