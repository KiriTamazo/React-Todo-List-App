import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodo, todoSelector } from "../../redux/todoSlice";

const TodoInput = () => {
  const todoItem = useSelector(todoSelector);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleSubmit = () => {
    const val = inputRef.current.value;
    if (val !== "") {
      const newItem = {
        id: todoItem.length + 1,
        title: val,
        status: false,
      };
      dispatch(setTodo(newItem));
      setError(null);
      inputRef.current.value = "";
    }
    if (val === "") {
      setError("Input should not be empty");
    }
  };
  return (
    <div className="flex gap-3">
      <input
        className="flex-1 dark:bg-[#2d2d41]"
        style={{ borderColor: error && "red" }}
        type="text"
        ref={inputRef}
      />
      {error && (
        <span
          style={{
            display: "block",
            margin: "10px 0",
            fontSize: "14px",
            color: "red",
          }}
        >
          {error}
        </span>
      )}
      <button
        className="btn bg-indigo-500 text-slate-100"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default TodoInput;
