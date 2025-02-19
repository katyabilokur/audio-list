"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function InCartList({ inCartItems, toggleItem, itemsToBuy }) {
  const isFullyInCart = inCartItems.length === itemsToBuy;
  const [open, setOpen] = useState(isFullyInCart);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }
  useEffect(() => {
    if (inCartItems.length === itemsToBuy) {
      setOpen(true);
    }
  }, [inCartItems.length, itemsToBuy]);

  return (
    <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
      <div onClick={toggleOpen} className="flex justify-between">
        <p>In cart</p>
        <p>
          <span>{inCartItems.length}</span> items
        </p>
      </div>
      {open && (
        <AnimatePresence>
          {inCartItems.map((item) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 p-2 bg-green-100 shadow-sm rounded"
            >
              <input
                type="checkbox"
                checked
                onChange={() => toggleItem(item)}
              />
              <span>{`${item.quantity} ${item.unit} ${item.note} ${item.name}`}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
