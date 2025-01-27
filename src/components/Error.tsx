import React from "react";

interface ErrorProps {
  title: string; // Заголовок помилки
  description: string; // Опис помилки
}

const Error: React.FC<ErrorProps> = ({ title, description }) => {
  return (
    <div className="max-w-md mx-auto my-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded-lg shadow">
      <h1 className="text-lg font-bold mb-2">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export { Error };
