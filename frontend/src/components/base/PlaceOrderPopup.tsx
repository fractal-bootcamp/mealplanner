import React from "react";
import { XIcon } from "lucide-react";

interface PlaceOrderPopupProps {
  onClose: () => void;
}

const PlaceOrderPopup: React.FC<PlaceOrderPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Place Your Order</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon size={20} />
          </button>
        </div>
        <div className="text-center py-4">
          <p className="text-xl font-bold">
            INSERT YOUR SHOPPING API HERE &lt;3
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPopup;
