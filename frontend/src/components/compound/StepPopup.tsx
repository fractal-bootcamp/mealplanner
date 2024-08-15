import React, { useState, useEffect } from "react";

interface StepPopupProps {
  onClose: () => void;
  onAddStep: (step: string) => void;
  onEditStep: (index: number, step: string) => void;
  stepToEdit: { index: number; step: string } | null;
}

const StepPopup: React.FC<StepPopupProps> = ({
  onClose,
  onAddStep,
  onEditStep,
  stepToEdit,
}) => {
  const [stepInput, setStepInput] = useState<string>("");

  useEffect(() => {
    if (stepToEdit) {
      setStepInput(stepToEdit.step);
    } else {
      setStepInput("");
    }
  }, [stepToEdit]);

  const handleSubmit = () => {
    if (stepInput.trim() !== "") {
      if (stepToEdit) {
        onEditStep(stepToEdit.index, stepInput);
      } else {
        onAddStep(stepInput);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg mb-2">
          {stepToEdit ? "Edit Step" : "Add Step"}
        </h3>
        <textarea
          placeholder="Describe the step"
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black w-full mb-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded mt-2 w-full"
        >
          {stepToEdit ? "Update Step" : "Add Step"}
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
