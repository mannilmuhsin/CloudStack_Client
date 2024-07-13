import React from 'react';

function SearchHistory({ history, onDeleteItem }) {
  if (!history || history.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Search History</h3>
      {history.map((item) => (
        <div key={item._id} className="flex justify-between items-center p-2 border-b">
          <span>{item.searchTerm}</span>
          <button 
            onClick={() => onDeleteItem(item._id)} 
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchHistory;