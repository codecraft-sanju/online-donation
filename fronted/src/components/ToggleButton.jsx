import React from 'react';

export default function ToggleButton({ darkMode, setDarkMode }) {
  return (
    <div className="absolute top-4 right-4 flex items-center">
      <span className="mr-2 text-sm font-medium">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}
        onClick={() => setDarkMode(!darkMode)}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all ${
            darkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
  );
}
