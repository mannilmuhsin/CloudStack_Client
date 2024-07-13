import React, { useState } from 'react';

function ModalDropdown({ history, onSelectItem, onDeleteItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (id) => {
    const selectedItem = history.find(item => item._id === id);
    if (selectedItem) {
      onSelectItem(selectedItem);
      setIsOpen(false); // Close dropdown after selection
    }
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation(); // Prevent closing the dropdown
    onDeleteItem(id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
      >
        Search History
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
          <ul>
            {history.map((item) => (
              <li key={item._id} className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer">
                <span onClick={() => handleSelectChange(item._id)}>{item.searchTerm}</span>
                <button
                  onClick={(e) => handleDeleteClick(item._id, e)}
                  className="text-black-500 ms-4 bg-red-500 p-2 hover:text-red-700 transition-colors duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModalDropdown;
