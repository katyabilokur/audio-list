"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AnimatedLists({ categoryItems, categoryName }) {
  const [items, setItems] = useState(categoryItems);
  const [inCartItems, setInCartItems] = useState([]);

  const toggleItem = (item) => {
    if (inCartItems.find((itm) => itm.id === item.id)) {
      setInCartItems(inCartItems.filter((i) => i.id !== item.id));
      setItems([...items, item]);
    } else {
      setItems(items.filter((i) => i.id !== item.id));
      setInCartItems([...inCartItems, item]);
    }
  };

  return (
    <div className="flex gap-6 p-6 flex-col">
      {/* List 1: To buy */}
      <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
        <h3 className="mb-2 font-semibold">{`${categoryName}: to buy`}</h3>
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 p-2 bg-white shadow-sm rounded"
            >
              <input type="checkbox" onChange={() => toggleItem(item)} />
              <span>{`${item.quantity} ${item.unit} ${item.note} ${item.name}`}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* List 2: items in cart */}
      <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
        <h3 className="mb-2 font-semibold">In cart</h3>
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
      </div>
    </div>
  );
}
