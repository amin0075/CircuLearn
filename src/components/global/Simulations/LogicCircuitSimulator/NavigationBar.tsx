// src/components/NavBar.tsx
import React from "react";

interface NavBarProps {
  onAddElement: (type: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAddElement }) => {
  return (
    <div className="bg-gray-800 p-4 w-full flex gap-4 z-10">
      <button
        onClick={() => onAddElement("input")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add Input
      </button>
      <button
        onClick={() => onAddElement("output")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add Output
      </button>
      <button
        onClick={() => onAddElement("AND")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add AND Gate
      </button>
      <button
        onClick={() => onAddElement("OR")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add OR Gate
      </button>
      <button
        onClick={() => onAddElement("NOT")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add NOT Gate
      </button>
      <button
        onClick={() => onAddElement("NAND")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add NAND Gate
      </button>
      <button
        onClick={() => onAddElement("NOR")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add NOR Gate
      </button>
      <button
        onClick={() => onAddElement("XOR")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add XOR Gate
      </button>
      <button
        onClick={() => onAddElement("XNOR")}
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Add XNOR Gate
      </button>
    </div>
  );
};

export default NavBar;
