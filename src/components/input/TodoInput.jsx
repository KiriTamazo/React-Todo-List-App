import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, todoSelector } from "../../redux/todoSlice";
import toast, { Toaster } from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/24/outline";

const TodoInput = () => {
  const todoItem = useSelector(todoSelector);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    const val = inputRef.current.value;
    if (val !== "") {
      const newItem = {
        id: todoItem.length + 1,
        title: val,
        status: "incomplete",
      };
      dispatch(addTodo(newItem));
      inputRef.current.value = "";
    }
    if (val === "") {
      toast.error("Input should not be empty", {
        id: "todo-input",
        className: "bg-white dark:bg-dark text-dark dark:text-lighter-gray",
      });
    }
  };

  return (
    <>
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          placeholder="Add Todo"
          className={`flex-1 bg-lighter-gray dark:bg-darker-gray `}
          type="text"
          ref={inputRef}
        />

        <button
          className="btn flex items-center gap-1 justify-center  bg-indigo-500 text-white"
          onClick={handleSubmit}
        >
          <PlusIcon className="w-5 h-5 md:w-6 lg:w-8 md:h-6 lg:h-8 inline-block p-0" />
          <p className="sm:hidden text-[18px]">Add Todo</p>
        </button>
      </div>
    </>
  );
};

export default TodoInput;
