import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoSelector } from "../../redux/todoSlice";
import ListItems from "./ListItems";

const List = () => {
  const todoItem = useSelector(todoSelector);

  if (todoItem?.length < 1) {
    return (
      <motion.li
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        No Todo Items to Show{" "}
      </motion.li>
    );
  }

  return (
    <ul className="list my-4 h-[50vh] overflow-y-scroll">
      <AnimatePresence>
        {todoItem?.map((todo, i) => (
          <ListItems key={i} todo={todo} />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default List;
