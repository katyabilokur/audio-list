"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import InCartList from "./InCartList";
import { updateCartItem } from "../_lib/helpers";

export default function AnimatedLists({ categoryItems }) {
  const [items, setItems] = useState(categoryItems);
  const [inCartItems, setInCartItems] = useState([]);

  async function toggleItem(item) {
    if (inCartItems.find((itm) => itm.id === item.id)) {
      setInCartItems(inCartItems.filter((i) => i.id !== item.id));
      setItems([...items, item]);
      //Remove from Redis
      await updateCartItem(item.categoryId, item.id, false);
    } else {
      //Adding an item to cart
      setItems(items.filter((i) => i.id !== item.id));
      setInCartItems([...inCartItems, item]);
      //Save to Redis
      await updateCartItem(item.categoryId, item.id);
    }
  }

  return (
    <div className="flex gap-6 p-6 flex-col">
      <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between">
          <p>To buy</p>
          <p>
            <span>{items.length}</span> items
          </p>
        </div>
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

      <InCartList
        inCartItems={inCartItems}
        toggleItem={toggleItem}
        itemsToBuy={categoryItems.length}
      />
    </div>
  );
}
