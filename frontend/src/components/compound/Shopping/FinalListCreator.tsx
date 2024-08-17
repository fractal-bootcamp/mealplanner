import React, { useState } from "react";
import { Pen, PenIcon, Trash } from "lucide-react";
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
    <div className="font-mono flex flex-col gap-2 items-center">
      <ul className="flex flex-col gap-2">
        {list.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-2 p-2 border-b"
          >
            <div>
              <span>{item.ingredient.name}</span>
              <span>
                {" "}
                // {item.amount} {item.unit}
              </span>
            </div>
            <div className="flex gap-2 text-white ">
              <button
                onClick={() => handleOpenPopup(index)}
                className="bg-blue-500 p-1 rounded hover:text-slate-600 "
              >
                <PenIcon />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 p-1 hover:text-slate-600 rounded"
              >
                <Trash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 items-start">
        <button
          onClick={() => handleOpenPopup()}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          add item
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          add to cart
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-purple-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-sky-300 p-6 rounded-lg shadow-lg max-w-lg w-96">
            <h3 className="text-xl mb-4 font-bold text-sky-900">
              {editIndex !== null ? "edit item" : "add item"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2 font-bold text-sky-900">
                  name
                </label>
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
                  className="border bg-sky-200 text-sky-800  p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-sky-900">
                  category
                </label>
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
                  className="border bg-sky-200 text-sky-800  p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-sky-900">
                  amount
                </label>
                <input
                  type="number"
                  value={newItem.amount}
                  onChange={(e) =>
                    setNewItem({ ...newItem, amount: Number(e.target.value) })
                  }
                  className="border bg-sky-200 text-sky-800 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-sky-900">
                  unit
                </label>
                <input
                  type="text"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unit: e.target.value })
                  }
                  className="border bg-sky-200 text-sky-800 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-sky-900">
                  notes
                </label>
                <textarea
                  value={newItem.notes}
                  onChange={(e) =>
                    setNewItem({ ...newItem, notes: e.target.value })
                  }
                  className="border bg-sky-200 text-sky-800 p-2 w-full"
                />
              </div>
              <div className="flex justify-center items-center space-x-10">
                <button
                  type="submit"
                  className="bg-green-600  text-yellow-300 font-bold px-6 py-3 rounded-xl mr-2 w-[110px]"
                >
                  save
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-amber-500  text-orange-900 font-bold px-6 py-3 rounded-xl w-[110px]"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalListCreator;
