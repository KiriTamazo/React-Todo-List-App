import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import TodoInput from "./components/input/TodoInput";
import List from "./components/lists/List";
import useDarkMode from "./hooks/useDarkMode";
import Footer from "./components/footer/Footer";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function App() {
  const { theme, toggleTheme } = useDarkMode();
  const [currentSelect, setCurrentSelect] = useState("all");

  return (
    <div
      className={`transition-all ease-in-out flex items-center relative p-2.5 md:p-0 duration-300  min-h-screen bg-light-gradient`}
    >
      <div className="flex-1">
        <section className="flex relative flex-col max-w-[600px] max-h-[600px] text-dark bg-white dark:bg-dark dark:text-light rounded-md p-4  sm:mx-auto transition-all duration-500">
          <Header />
          <TodoInput />
          <List currentSelect={currentSelect} />
          <Footer
            currentSelect={currentSelect}
            setCurrentSelect={setCurrentSelect}
          />
          <button
            className="darkModeBtn btn grid place-content-center p-2 absolute top-1 right-1  bg-white text-dark dark:bg-dark dark:text-light rounded-sm transition-all duration-500"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
