import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import TodoInput from "./components/input/TodoInput";
import List from "./components/lists/List";
import ListItems from "./components/lists/ListItems";
import useDarkMode from "./hooks/useDarkMode";
import { todoSelector } from "./redux/todoSlice";

function App() {
  const todoItem = useSelector(todoSelector);
  console.log(todoItem);
  const { theme, toggleTheme } = useDarkMode();
  console.log(theme, "theme");

  return (
    <div className={`transition-all duration-500 min-h-screen bg-indigo-500`}>
      APPP
      <br />
      <button className="btn" onClick={toggleTheme}>
        DarkMode
      </button>
      <section className="max-w-[600px] max-h-[500px] text-[#080025] bg-[#fefdf2] dark:bg-[#080025] dark:text-[#F7F5FF] rounded-md p-4 mx-auto transition-all duration-500">
        <Header />
        <TodoInput />
        <List />
      </section>
    </div>
  );
}

export default App;
