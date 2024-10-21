import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl transform transition-all duration-300 ease-in-out scale-105">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">تأیید حذف</h2>
        <p className="text-gray-600">آیا مطمئن هستید که می‌خواهید این کامنت را حذف کنید؟</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md transition hover:bg-gray-100 hover:shadow"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md transition hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
