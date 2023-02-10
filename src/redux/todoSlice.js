import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const option = {
  position: "bottom-right",
  className: "bg-white dark:bg-dark text-dark dark:text-lighter-gray",
};

const initialState = {
  todoList: JSON.parse(localStorage.getItem("todo")) || [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setCheck: (state, action) => {
      const checkItem = state.todoList.find(
        (item, i) => item.id === action.payload.id
      );
      checkItem.status =
        checkItem.status === "completed" ? "incomplete" : "completed";
      const update = state.todoList.map((item) =>
        item.id === action.payload ? checkItem : item
      );

      state.todoList = update;
      localStorage.setItem("todo", JSON.stringify(state.todoList));
    },
    addTodo: (state, action) => {
      if (action.payload === "") {
        toast.error(`Input should not be empty`);
      }
      state.todoList = [...state.todoList, action.payload];
      localStorage.setItem("todo", JSON.stringify(state.todoList));
      toast.success(`Add Successfully`, option);
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      const deleteTodo = state.todoList.filter((item) => item.id !== id);
      console.log(id, "delete", deleteTodo);
      state.todoList = deleteTodo;
      localStorage.setItem("todo", JSON.stringify(deleteTodo));
      toast.success(`Todo Deleted`, option);
    },
    editTodo: (state, action) => {
      const updateTodo = state.todoList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.todoList = updateTodo;
      localStorage.setItem("todo", JSON.stringify(updateTodo));
      toast.success(`Todo Updated`, option);
    },
    clearTodo: (state, action) => {
      if (state.todoList.length > 0) {
        state.todoList = [];
        localStorage.removeItem("todo");
        toast.success(`All Todo are deleted`, option);
      }
    },
  },
});

export const todoSelector = (state) => state.todo.todoList;
export const { setCheck, addTodo, deleteTodo, editTodo, clearTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
