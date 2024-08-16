import React from "react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
  amount: number;
  unit: string;
};

type ListProps = {
  list: Ingredient[];
};

const List: React.FC<ListProps> = ({ list }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">List Items</h2>
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li key={index} className="border-b pb-2">
            {item.ingredient.name} ({item.amount} {item.unit}) - {item.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
