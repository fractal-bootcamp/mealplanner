import React, { useState } from "react";

interface ListProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
}

const List: React.FC<ListProps> = ({ items, setItems, placeholder }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddItem = (): void => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleRemoveItem = (index: number): void => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded text-black mr-2"
        />
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 p-2 mb-1 rounded"
          >
            {item}
            <button
              onClick={() => handleRemoveItem(index)}
              className="ml-2 bg-red-500 text-white p-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

// const List = () => {
//   const [list, setList] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   // Add and remove steps
//   const [steps, setSteps] = useState([]);
//   const [stepInput, setStepInput] = useState("");

//   // (3) Add and remove steps functions
//   const handleAddStep = () => {
//     if (stepInput.trim() !== "") {
//       setSteps([...steps, stepInput]);
//       setStepInput("");
//     }
//   };

//   const handleStepInputChange = (e) => {
//     setStepInput(e.target.value);
//   };

//   const handleRemoveStep = (index) => {
//     setSteps(steps.filter((_, i) => i !== index));
//   };

//   return (
//     <>
//       {/* // (3) Add and remove steps */}
//       <div className="mt-4">
//         <div className="flex items-center mb-2">
//           <input
//             type="text"
//             placeholder="Add step"
//             value={stepInput}
//             onChange={handleStepInputChange}
//             className="border border-gray-300 p-2 rounded text-black mr-2"
//           />
//           <button
//             onClick={handleAddStep}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <div className="flex flex-col">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-gray-200 p-2 mb-1 rounded"
//             >
//               {step}
//               <button
//                 onClick={() => handleRemoveStep(index)}
//                 className="ml-2 bg-red-500 text-white p-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default List;
