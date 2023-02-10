import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoSelector } from "../../redux/todoSlice";
import ListItems from "./ListItems";

const List = ({ currentSelect }) => {
  const todoItem = useSelector(todoSelector);
  const updateItem = [...todoItem].sort((a, b) => b.id - a.id);

  // For Select Filter
  const filterItem = () => {
    if (currentSelect === "all") return updateItem;
    if (currentSelect === "completed")
      return updateItem.filter((item) => item.status === "completed");
    if (currentSelect === "incomplete")
      return updateItem.filter((item) => item.status === "incomplete");
  };
  const filterList = useMemo(filterItem, [updateItem]);

  // Fallback List Item
  if (filterList?.length < 1) {
    return (
      <motion.li
        className="my-4 text-center bg-lighter-gray dark:bg-darker-gray px-2 py-2.5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        No Todo Items to Show{" "}
      </motion.li>
    );
  }

  return (
    <ul className="list my-2 md:my-4 max-h-[44vh] overflow-y-scroll">
      <AnimatePresence presenceAffectsLayout={ListItems}>
        {filterList?.map((todo) => (
          <ListItems key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default List;
