"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import PaperElement from "./visual/PaperElement";
import { ShoppingCartCheck02Icon } from "hugeicons-react";
import {
  ChevronDoubleDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Kalam } from "next/font/google";

const font = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function InCartList({ inCartItems, toggleItem, itemsToBuy }) {
  const isFullyInCart = inCartItems.length === itemsToBuy;
  const [open, setOpen] = useState(isFullyInCart);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }
  useEffect(() => {
    if (itemsToBuy === 0) {
      setOpen(true);
    }
  }, [inCartItems.length, itemsToBuy]);

  return (
    <PaperElement colour="bg-primary_tur-50">
      {/* <div className="w-1/2 p-4 bg-gray-100 rounded-lg"> */}
      <div
        onClick={toggleOpen}
        className="group hover:cursor-pointer text-zinc-500 hover:text-zinc-800 flex flex-col"
      >
        <div className="flex justify-between mb-2 px-6 ">
          <div className="flex gap-4">
            <ShoppingCartCheck02Icon className="h-8 text-primary_green-500 group-hover:text-primary_green-400" />
            <h2 className="text-lg sm:text-xl font-medium">In Cart</h2>
          </div>
          <p className="text-zinc-700">
            <span className="font-medium">{inCartItems.length}</span>{" "}
            {inCartItems.length === 1 ? "item" : "items"}
          </p>
        </div>
        {!open ? (
          <ChevronDoubleDownIcon className="h-6 text-center" />
        ) : (
          <ChevronUpIcon className="h-6 text-center" />
        )}
      </div>

      {open && (
        <>
          <hr className="w-full h-[1.5px] mt-2 mb-[6px] bg-primary_rose-500 border-0"></hr>
          <hr className="w-full h-[1.5px] bg-primary_rose-500 border-0 mb-2"></hr>
          <AnimatePresence>
            {inCartItems.map((item) => (
              <motion.div
                key={`${item.name}-${item.id}`}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 p-3 border-b border-b-zinc-400"
              >
                <input
                  id={`in-cart-${item.id}`}
                  className="ml-3 sm:ml-6 h-5 w-5 peer cursor-pointer transition-all appearance-none rounded bg-primary_red-25 hover:bg-primary_green-300 border border-zinc-300 checked:bg-primary_green-500 checked:border-primary_green-500 relative 
  before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:content-['✔'] before:opacity-0 checked:before:opacity-100"
                  type="checkbox"
                  checked
                  onChange={() => toggleItem(item)}
                />
                <label
                  htmlFor={`in-cart-${item.id}`}
                  className={`mr-3 sm:mr-6 text-lg cursor-pointer ${font.className}`}
                >
                  <span className="font-semibold">{item.quantity} </span>
                  {`${item.unit} of `}
                  <span className="font-semibold">{item.name}</span>{" "}
                  {item.note && (
                    <span className="italic text-zinc-500">{`(${item.note})`}</span>
                  )}
                </label>
                {/* <span>{`${item.quantity} ${item.unit} ${item.note} ${item.name}`}</span> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
      {/* </div> */}
    </PaperElement>
  );
}
