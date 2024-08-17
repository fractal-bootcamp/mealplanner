import React from "react";

// Define RecipeIngredient type if not already defined
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
  recipeIngredients: RecipeIngredient[];
};

type ShoppingLists = {
  [key: string]: Ingredient[];
};

type ShoppingProps = {
  lists: ShoppingLists;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

const ShoppingOrder: React.FC<Cart> = ({ cart }) => {
  return (
    <div className="font-mono">
      <div>
        <h2> your order: </h2>
      </div>
      <div>
        <ul>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index}>
                <h3>{item.ingredient.name} x</h3>
                <h3>{item.ingredient.category}s</h3>
                <h3>
                  {item.amount} {item.unit}
                </h3>
              </li>
            ))
          ) : (
            <li>No ingredients found...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingOrder;
