import React, { useState } from "react";
import List from "../../base/List";

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
};

const colorPalette = [
  "bg-lime-300",
  "bg-rose-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-teal-300",
];

const Lists: React.FC<ListsProps> = ({ lists }) => {
  const [showListPopup, setShowListPopup] = useState<boolean>(false);
  const [displayList, setDisplayList] = useState<Ingredient[]>([]);
  const [popupColorClass, setPopupColorClass] = useState<string>("");

  const handleList = (list: Ingredient[], colorClass: string) => {
    setShowListPopup(true);
    setDisplayList(list);
    setPopupColorClass(colorClass);
  };

  const closePopup = () => {
    setShowListPopup(false);
    setDisplayList([]);
    setPopupColorClass("");
  };

  return (
    <div>
      {Object.keys(lists).map((key, index) => {
        const colorClass = colorPalette[index % colorPalette.length];
        return (
          <div key={key} className="mb-4">
            <h2>
              <button
                onClick={() => handleList(lists[key], colorClass)}
                className={`${colorClass} font-bold text-left p-3 bg-gray-200 w-52 rounded-md `}
              >
                {key}
              </button>
            </h2>
          </div>
        );
      })}

      {showListPopup && (
        <div className="fixed font-mono inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${popupColorClass}`}
          >
            <List list={displayList} />
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
