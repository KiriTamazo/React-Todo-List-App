import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTodo,
  deleteTodo,
  editTodo,
  option,
  todoSelector,
} from "../../redux/todoSlice";
import Select from "../select/Select";
import toast from "react-hot-toast";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { delay: 0.5, duration: 0.5, when: "afterChildren" },
  },
};
const modal = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: -0, opacity: 1, transition: { delay: 0.3 } },
  exit: { y: -100, opacity: 0, transition: { duration: 0.5 } },
};

const Modal = ({ title, setModal, id }) => {
  const dispatch = useDispatch();
  const todoItem = useSelector(todoSelector);
  const singleItem = todoItem?.find((item) => item.id === id);
  const [input, setInput] = useState(singleItem?.title);
  const [currentSelect, setCurrentSelect] = useState(singleItem?.status);

  const handleUpdate = (id) => {
    dispatch(editTodo({ id, title: input, status: currentSelect }));
    setModal(null);
  };

  const handleRemove = (id) => {
    dispatch(deleteTodo({ id }));
    setModal(null);
  };
  const handleRemoveAll = () => {
    dispatch(clearTodo());
    setModal(null);
  };

  console.log({ id, title: input, status: currentSelect });
  return (
    <motion.div
      key="modal-container"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-screen h-screen z-50 fixed inset-0 bg-opacity-40 bg-slate-800 flex items-center justify-center"
    >
      <motion.div
        variants={modal}
        key="modal"
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col min-w-[400px]  px-4 py-4 rounded-sm dark:bg-dark bg-white
        text-dark dark:text-light
      "
      >
        {/* Modal Header */}
        <div className="text-center capitalize">
          {title === "update" ? <p> {title} Todo</p> : <p>Are you Sure?</p>}
        </div>

        {/* Modal Body */}
        {title === "update" ? (
          <div className="flex-1 my-4 flex flex-col gap-4">
            <div className="grid gap-2">
              <label htmlFor="">Title</label>
              <input
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                className="bg-lighter-gray dark:bg-darker-gray p-2 py-1"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="">Status</label>
              <Select
                currentSelect={currentSelect}
                setCurrentSelect={setCurrentSelect}
                options={["completed", "incomplete"]}
              />
            </div>
          </div>
        ) : (
          <div className="my-4">
            <p className="bg-red-200 dark:text-dark rounded-sm p-2 text-[16px]">
              Do you really want to delete the record? <br /> This action cannot
              be undone.
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setModal(null);
              toast.error(`Operation Cancled`, option);
            }}
            className="bg-gray-500 px-2 py-1 rounded-sm text-[16px]  text-white"
          >
            Cancle
          </button>
          <button
            onClick={() => {
              title === "update" && handleUpdate(id);
              title === "delete" && handleRemove(id);
              title === "delete all" && handleRemoveAll();
            }}
            className={`capitalize ${
              title === "update" ? "bg-green-500" : "bg-red-500"
            } px-2 py-1 rounded-sm text-[16px] text-white`}
          >
            {title}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
