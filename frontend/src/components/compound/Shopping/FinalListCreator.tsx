import React, { useState } from "react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
  amount: number;
  unit: string;
};

const initialList: Ingredient[] = [
  {
    ingredient: { name: "Pancetta", category: "Meat" },
    notes: "Fry until crispy",
    amount: 150,
    unit: "grams",
  },
  {
    ingredient: { name: "Spaghetti", category: "Grain" },
    notes: "Cook according to package instructions",
    amount: 200,
    unit: "grams",
  },
  {
    ingredient: { name: "Parmesan cheese", category: "Dairy" },
    notes: "Grated",
    amount: 100,
    unit: "grams",
  },
  {
    ingredient: { name: "Chicken breast", category: "Meat" },
    notes: "Cut into pieces",
    amount: 500,
    unit: "grams",
  },
  {
    ingredient: { name: "Onion", category: "Vegetable" },
    notes: "Sauté until translucent",
    amount: 1,
    unit: "",
  },
  {
    ingredient: { name: "Garlic", category: "Vegetable" },
    notes: "Minced",
    amount: 3,
    unit: "cloves",
  },
];

const FinalListCreator: React.FC = () => {
  const [list, setList] = useState<Ingredient[]>(initialList);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<Ingredient>({
    ingredient: { name: "", category: "" },
    notes: "",
    amount: 0,
    unit: "",
  });
  const [cart, setCart] = useState<Ingredient[]>([]);

  const handleOpenPopup = (index?: number) => {
    setEditIndex(index ?? null);
    setNewItem(
      index !== undefined
        ? list[index]
        : {
            ingredient: { name: "", category: "" },
            notes: "",
            amount: 0,
            unit: "",
          }
    );
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(null);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = newItem;
      setList(updatedList);
    } else {
      setList([...list, newItem]);
    }
    handleClosePopup();
  };

  const handleDelete = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const handleAddToCart = () => {
    // Exclude notes from each item when adding to cart
    const itemsWithoutNotes = list.map(({ notes, ...item }) => item);
    setCart([...cart, ...itemsWithoutNotes]);
    alert("Items added to cart!");
  };
  return (
    <div className="font-mono">
      <h2>Final List Creator</h2>
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-2 p-2 border-b"
          >
            <div>{item.ingredient.name}</div>
            <div>
              // {item.amount} {item.unit}
            </div>
            <div>
              <button
                onClick={() => handleOpenPopup(index)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleOpenPopup()}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
      <button
        onClick={handleAddToCart}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
      >
        Add to Cart
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl mb-4">
              {editIndex !== null ? "Edit Item" : "Add Item"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={newItem.ingredient.name}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      ingredient: {
                        ...newItem.ingredient,
                        name: e.target.value,
                      },
                    })
                  }
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <input
                  type="text"
                  value={newItem.ingredient.category}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      ingredient: {
                        ...newItem.ingredient,
                        category: e.target.value,
                      },
                    })
                  }
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Amount</label>
                <input
                  type="number"
                  value={newItem.amount}
                  onChange={(e) =>
                    setNewItem({ ...newItem, amount: Number(e.target.value) })
                  }
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Unit</label>
                <input
                  type="text"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unit: e.target.value })
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Notes</label>
                <textarea
                  value={newItem.notes}
                  onChange={(e) =>
                    setNewItem({ ...newItem, notes: e.target.value })
                  }
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleClosePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalListCreator;
