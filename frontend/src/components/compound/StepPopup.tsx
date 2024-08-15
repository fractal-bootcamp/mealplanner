import React, { useState, useEffect } from "react";

interface StepPopupProps {
  onClose: () => void;
  onAddStep: (step) => void;
  onEditStep: (step) => void;
  stepToEdit: string | null;
}

const StepPopup: React.FC<StepPopupProps> = ({
  onClose,
  onAddStep,
  onEditStep,
  stepToEdit,
}) => {
  console.log("StepPopup rendered with stepToEdit:", stepToEdit);

  const [stepInput, setStepInput] = useState<string>(
    stepToEdit?.stepToEdit || ""
  );

  const [step, setStep] = useState<string>(stepToEdit?.stepToEdit || "");

  useEffect(() => {
    console.log("useEffect triggered with stepToEdit:", stepToEdit);
    if (stepToEdit) {
      console.log("Updating state with stepToEdit");
      setStepInput(stepToEdit);
    } else {
      console.log("Resetting state (no steptToEdit)");
      setStepInput("");
    }
  }, [stepToEdit]);

  const handleAddStep = () => {
    if (stepInput.trim() !== "") {
      const newStep = {
        stepInput,
      };
      onAddStep(newStep.stepInput);
      console.log("New step added", newStep.stepInput);
      setStepInput("");
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
          onClick={handleAddStep}
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
