import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface props {
  children?: ReactNode;
}

const Overlay = ({ children }: props) => {
  //Variants
  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="show"
      className="fixed z-50 left-0 top-0 w-screen h-screen bg-black/[.54] flex justify-center laptop:items-center"
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
