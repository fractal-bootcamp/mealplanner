import React, { useState, useEffect } from "react";
import List from "../../base/List";
import { ShoppingBasketIcon } from "lucide-react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
  amount: number;
  unit: string;
};

type ShoppingLists = {
  [key: string]: Ingredient[];
};

type ListsProps = {
  lists: ShoppingLists;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

const Lists: React.FC<ListsProps> = ({ lists, cart, setCart }) => {
  const [showListPopup, setShowListPopup] = useState<boolean>(false);
  const [displayList, setDisplayList] = useState<Ingredient[]>([]);
  const [popupColorClass, setPopupColorClass] = useState<string>("");

  // State for handling editing
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<Ingredient | null>(null);

  //   // State for cart management
  //   const [cart, setCart] = useState<Omit<Ingredient, "notes">[]>([]);

  const colorPalette = [
    "bg-lime-300",
    "bg-rose-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-teal-300",
  ];

  const handleList = (list: Ingredient[], colorClass: string) => {
    setShowListPopup(true);
    setDisplayList(list);
    setPopupColorClass(colorClass);
  };

  const closePopup = () => {
    setShowListPopup(false);
    setDisplayList([]);
    setPopupColorClass("");
    setEditingIndex(null);
    setEditedItem(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedItem({ ...displayList[index] });
  };

  const handleSave = (index: number) => {
    if (editedItem) {
      const updatedList = [...displayList];
      updatedList[index] = editedItem;
      setDisplayList(updatedList);
      setEditingIndex(null);
      setEditedItem(null);
    }
  };

  // Function to add all items from a list to the cart without notes
  const addToCart = (list: Ingredient[]) => {
    // Filter out the notes and add to cart
    const itemsWithoutNotes = list.map(({ notes, ...item }) => item);
    setCart((prevCart) => {
      // Ensure prevCart is an array before spreading it
      const updatedCart = [
        ...(Array.isArray(prevCart) ? prevCart : []),
        ...itemsWithoutNotes,
      ];
      // Log updated cart state
      console.log("Cart is:", updatedCart);
      return updatedCart;
    });
  };

  // Optional: If you need to perform actions when cart changes
  useEffect(() => {
    console.log("Cart has been updated:", cart);
  }, [cart]);

  return (
    <div>
      {Object.keys(lists).map((key, index) => {
        const colorClass = colorPalette[index % colorPalette.length];
        return (
          <div key={key} className="mb-4">
            <h2 className="flex items-center">
              <button
                onClick={() => handleList(lists[key], colorClass)}
                className={` ${colorClass} font-bold text-left p-3 w-52 rounded-md`}
              >
                {key}
              </button>
              <button
                onClick={() => addToCart(lists[key])}
                className="ml-4 font-mono font-bold bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900"
              >
                <ShoppingBasketIcon />
              </button>
            </h2>
          </div>
        );
      })}

      {showListPopup && (
        <div className="fixed font-mono inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-4 rounded-lg max-w-2xl w-96 max-h-[90vh] overflow-y-auto ${popupColorClass}`}
          >
            <div>
              {displayList.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="flex-1">
                    <span>{item.ingredient.name}</span>
                    {editingIndex === index ? (
                      <div>
                        <input
                          type="text"
                          value={editedItem?.ingredient.name || ""}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem!,
                              ingredient: {
                                ...editedItem!.ingredient,
                                name: e.target.value,
                              },
                            })
                          }
                          className="border p-1 ml-2"
                        />
                        <input
                          type="text"
                          value={editedItem?.ingredient.category || ""}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem!,
                              ingredient: {
                                ...editedItem!.ingredient,
                                category: e.target.value,
                              },
                            })
                          }
                          className="border p-1 ml-2"
                        />
                        <input
                          type="number"
                          value={editedItem?.amount || 0}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem!,
                              amount: Number(e.target.value),
                            })
                          }
                          className="border p-1 ml-2"
                        />
                        <input
                          type="text"
                          value={editedItem?.unit || ""}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem!,
                              unit: e.target.value,
                            })
                          }
                          className="border p-1 ml-2"
                        />
                        <input
                          type="text"
                          value={editedItem?.notes || ""}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem!,
                              notes: e.target.value,
                            })
                          }
                          className="border p-1 ml-2"
                        />
                      </div>
                    ) : (
                      <div>
                        <span>
                          {item.category} - {item.amount} {item.unit}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  {editingIndex === index && (
                    <button
                      onClick={() => handleSave(index)}
                      className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white font-bold px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;
