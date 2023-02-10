import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCheck } from "../../redux/todoSlice";
import Modal from "../modal/Modal";

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
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null);
  const { id, title, status } = todo;
  const listRef = useRef(false);

  // For Animation
  useEffect(() => {
    listRef.current = true;
  }, []);

  const handleOpenModal = (type) => {
    setModal(type);
  };
  const handleCheck = () => {
    dispatch(setCheck(todo));
  };

  return (
    <>
      <motion.li
        className={`${
          todo.status === "completed" ? "line-through text-gray-400" : ""
        } my-3 bg-lighter-gray  dark:bg-darker-gray px-2 py-2.5 flex items-center gap-2
        rounded-sm cursor-pointer`}
        key={id}
        variants={items}
        initial={listRef.current ? "visible" : "hidden"}
        animate="visible"
        exit="exit"
        custom={id * 0.05}
        layout="position"
      >
        <div className="flex flex-1 items-center" onClick={handleCheck}>
          <input
            readOnly
            type="checkbox"
            checked={status === "completed" ? true : false}
          />
          <p className="pl-2  max-w-[120px] sm:max-w-none break-words sm:break-normal  text-ellipsis flex-1">
            {" "}
            {title}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal("update")}
            className="bg-green-500 p-1 rounded-sm text-white hover:scale-110 transition-all duration-500 ease-in-out"
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          <button
            className="bg-red-500 p-1 rounded-sm text-white hover:scale-110 transition-all duration-500 ease-in-out"
            onClick={() => {
              handleOpenModal("delete");
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </motion.li>
      <AnimatePresence>
        {modal !== null && <Modal title={modal} setModal={setModal} id={id} />}
      </AnimatePresence>
    </>
  );
}
