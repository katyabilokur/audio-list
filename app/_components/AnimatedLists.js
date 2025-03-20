"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import InCartList from "./InCartList";
import { deleteItems, updateCartItem } from "../_lib/helpers";
import BackButton from "./BackButton";
import { redirect } from "next/navigation";
import ConfirmationDialog from "./dialogs/ConfirmationDialog";
import PaperElement from "./visual/PaperElement";
import { TaskEdit01Icon } from "hugeicons-react";
import { Kalam } from "next/font/google";

const font = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function AnimatedLists({
  categoryItems,
  alreadyInCartIds,
  extraItems,
}) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [items, setItems] = useState(() =>
    categoryItems.filter((item) => !alreadyInCartIds.includes(item.id))
  );
  const [inCartItems, setInCartItems] = useState(() =>
    [
      ...new Map(
        [...categoryItems, ...extraItems].map((item) => [item.id, item])
      ).values(),
    ].filter((item) => alreadyInCartIds.includes(item.id))
  );

  useEffect(() => {
    setItems(
      categoryItems.filter(
        (item) => !inCartItems.some((inCart) => inCart.id === item.id)
      )
    );
  }, [categoryItems, inCartItems]);

  async function handleFinishShopping() {
    if (inCartItems.length > 0) {
      await deleteItems(inCartItems.map((el) => el.id));
      setIsConfirmationOpen(true);
    }
  }

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
    <div className="flex gap-6 flex-col">
      <PaperElement colour="bg-primary_red-50">
        <div className="flex justify-between mb-2 px-6">
          <div className="flex gap-4">
            <TaskEdit01Icon className="h-8 text-primary_red-400" />
            <h2 className="text-lg sm:text-xl font-medium text-zinc-600">
              To buy
            </h2>
          </div>
          <p className="text-zinc-700">
            <span className="font-medium">{items.length}</span>{" "}
            {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <hr className="w-full h-[1.5px] mt-2 mb-[6px] bg-primary_rose-500 border-0"></hr>
        <hr className="w-full h-[1.5px] bg-primary_rose-500 border-0 mb-2"></hr>

        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.name}-${item.id}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 p-3 border-b border-b-zinc-400"
            >
              <input
                id={`to-buy-${item.id}`}
                className="ml-3 sm:ml-6 h-5 w-5 peer cursor-pointer transition-all appearance-none rounded bg-primary_red-25  hover:bg-primary_red-300 border border-zinc-300 checked:bg-primary_red-400 checked:border-primary_red-400"
                type="checkbox"
                onChange={() => toggleItem(item)}
              />
              <label
                htmlFor={`to-buy-${item.id}`}
                className={`mr-3 sm:mr-6 text-lg cursor-pointer ${font.className}`}
              >
                <span className="font-semibold">{item.quantity} </span>
                {`${item.unit} of `}
                <span className="font-semibold">{item.name}</span>{" "}
                {item.note && (
                  <span className="italic text-zinc-500">{`(${item.note})`}</span>
                )}
              </label>
            </motion.div>
          ))}
        </AnimatePresence>
      </PaperElement>

      <InCartList
        inCartItems={inCartItems}
        toggleItem={toggleItem}
        itemsToBuy={items.length}
      />

      <div className="flex gap-2">
        <BackButton>Go Back</BackButton>
        <button
          onClick={handleFinishShopping}
          disabled={inCartItems.length === 0}
        >
          Finish shopping
        </button>
      </div>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        text={`You bought ${inCartItems.length} items. Shopping is finished`}
        onClose={() => redirect("/home")}
      />
    </div>
  );
}
