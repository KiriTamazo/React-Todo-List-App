import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: JSON.parse(localStorage.getItem("todo")) || [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todoList = [...state.todoList, action.payload];
      localStorage.setItem("todo", JSON.stringify(state.todoList));
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      const deleteTodo = state.todoList.filter((item) => item.id !== id);
      console.log(id, "delete", deleteTodo);
      state.todoList = deleteTodo;
      localStorage.setItem("todo", JSON.stringify(deleteTodo));
    },
  },
});

export const todoSelector = (state) => state.todo.todoList;
export const { setTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
