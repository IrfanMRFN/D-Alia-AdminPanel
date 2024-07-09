import React from "react";

const ConfirmPopup = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-acadia bg-opacity-65">
      <div className="bg-acadia-3 p-3 w-10/12 md:w-6/12 rounded-lg text-offwhite border md:border-2 border-acadia-2 shadow-lg text-center">
        <h2 className="md:text-lg lg:text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm md:text-base mb-4">{message}</p>
        <div className="flex justify-center gap-4 mx-6 md:mx-12">
          <button
            onClick={onConfirm}
            className="w-1/2 md:w-3/5 text-sm md:text-base px-3 py-1 bg-red-800 rounded-lg hover:bg-red-900 transition duration-200 shadow-lg"
          >
            Ya
          </button>
          <button
            onClick={onCancel}
            className="w-1/2 md:w-3/5 text-sm md:text-base px-3 py-1 bg-acadia-2 rounded-lg hover:bg-acadia transition duration-200 shadow-lg"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
