import React, { useState } from "react";
import { useSelector } from "react-redux";
import { todoSelector } from "../../redux/todoSlice";
import Modal from "../modal/Modal";
import Select from "../select/Select";

const Footer = ({ currentSelect, setCurrentSelect }) => {
  const todoItems = useSelector(todoSelector);
  const length = todoItems.length;
  const [modal, setModal] = useState(null);

  return (
    <footer className="mt-2.5 flex  items-center justify-between gap-2">
      <Select
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />
      <p className="text-[16px] hidden sm:block">
        You have {length} todo {""}
        {length > 1 ? "tasks" : "task"}
      </p>
      <button
        disabled={length < 1 && true}
        onClick={() => setModal("delete all")}
        className="text-[14px] disabled:bg-slate-500 disabled:cursor-not-allowed bg-red-500 px-2 py-1 text-white rounded-sm hover:scale-105 transition-all duration-500 ease-in-out"
      >
        Clear All
      </button>
      {modal && <Modal setModal={setModal} title={modal} />}
    </footer>
  );
};

export default Footer;
