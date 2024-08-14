import React, { useState } from "react";
import { Step } from "../../../../shared/interfaces";

interface StepPopupProps {
  onClose: () => void;
  onAddStep: (step: Step) => void;
}

const StepPopup: React.FC<StepPopupProps> = ({ onClose, onAddStep }) => {
  const [stepInput, setStepInput] = useState<string>("");

  const handleAddStep = () => {
    if (stepInput.trim() !== "") {
      const newStep: Step = {
        content: stepInput,
        ingredients: [],
      };
      onAddStep(newStep);
      setStepInput("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg mb-2">Add Step</h3>
        <textarea
          placeholder="Describe the step"
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black w-full mb-2"
        />
        <button
          onClick={handleAddStep}
          className="bg-green-500 text-white p-2 rounded mt-2 w-full"
        >
          Add Step
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

export default StepPopup;
