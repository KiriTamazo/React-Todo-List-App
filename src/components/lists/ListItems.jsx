import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoSelector, deleteTodo } from "../../redux/todoSlice";

const items = {
  hidden: { y: -20, opacity: 0 },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom < 0.5 ? custom : 0.5 },
  }),
  exit: {
    opacity: 0,
  },
};

export default function ListItems({ todo }) {
  const todoItem = useSelector(todoSelector);
  const dispatch = useDispatch();
  const { id, title, status } = todo;
  const listRef = useRef(false);

  useEffect(() => {
    listRef.current = true;
  }, []);

  const handleRemove = (id) => {
    console.log(id);
    dispatch(deleteTodo({ id }));
  };

  const handleChange = () => {};

  return (
    <motion.li
      style={{
        margin: "20px 0",
        background: "gray",
        padding: "10px 0",
        borderRadius: "5px",
      }}
      key={id}
      variants={items}
      initial={listRef.current ? "visible" : "hidden"}
      animate="visible"
      exit="exit"
      custom={id * 0.05}
      layout="position"
    >
      <input onChange={handleChange} type="checkbox" checked={status} />
      {title}
      <button onClick={() => handleRemove(id)}>Delete</button>
    </motion.li>
  );
}
