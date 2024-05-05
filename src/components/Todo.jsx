import React, { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

const Todo = ({ todo, deleteTodo, editItem, toggleComplete, updateItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTodo(todo.id);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className=" flex items-center justify-center sm:justify-between md:justify-between bg-slate-300 mb-4 md:mb-6">
      <div className="flex">
        <input
          type="checkbox"
          onChange={() => toggleComplete(todo)}
          checked={todo.completed ? "checked" : ""}
        />
        <p
          className={`text-[16px] md:text-[25px] sm:text-[20px] sm:w-[210px] capitalize ml-4 w-[120px] md:w-[400px] md:ml-8  overflow-hidden ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.value}
        </p>
      </div>
      <div className="sm:mr-4">
        <button
          className=" border-none rounded  sm:rounded md:rounded-lg ml-2 sm:p-[9px] md:ml-5 p-2 md:p-3 md:w-[100px] md:text-xl bg-[#5865F2] text-slate-50 font-semibold mr-2 md:mr-5"
          onClick={() => updateItem(todo)}
        >
          Edit
        </button>
        <button
          className="border-none rounded  sm:rounded sm:p-[9px] md:rounded-lg  md:ml-5 p-2 md:p-3 md:w-[100px] md:text-xl bg-[#5865F2] text-slate-50 font-semibold "
          onClick={handleDeleteClick}
        >
          Del
        </button>
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </li>
  );
};

export default Todo;
