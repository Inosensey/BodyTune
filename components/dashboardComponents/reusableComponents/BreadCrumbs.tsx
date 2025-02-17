"use client";
import { motion } from "framer-motion";
import style from "@/css/BreadCrumbs.module.css"

// Types
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  selectedBreadCrumb: InterfaceBreadCrumbs;
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
  breadCrumbs: Array<InterfaceBreadCrumbs>;
}


const BreadCrumbs = ({
  breadCrumbs,
  setSelectedBreadCrumb,
  selectedBreadCrumb,
  setProgress
}: props) => {
  return (
    <div className="flex border-[1.5px] border-secondary w-full mx-auto">
      {breadCrumbs.map((breadcrumb: InterfaceBreadCrumbs) => (
        <motion.div
          onClick={() => {
            setSelectedBreadCrumb(breadcrumb)
            setProgress(breadcrumb.id)
          }}
          key={breadcrumb.id}
          className={`group bg-black px-4 py-4 cursor-pointer relative ${style.breadcrumbs}`}
        >
          <p
            className={`font-dmSans font-semibold phone:text-[0.8rem] mdphone:text-sm tablet:text-base transition duration-200 ${
              selectedBreadCrumb.id === breadcrumb.id
                ? "text-[#a3e09f]"
                : "text-[#D3F0D1] group-hover:text-[#a3e09f]"
            }`}
          >
            {breadcrumb.title}
          </p>
          <p
            className={`font-quickSand phone:hidden mdphone:text-[0.6rem] tablet:block tablet:text-[0.8rem] transition duration-200 ${
              selectedBreadCrumb.id === breadcrumb.id
                ? "text-[#ffffff]"
                : "text-[#b3b3b3] group-hover:text-[#ffffff]"
            }`}
          >
            {breadcrumb.shortDescription}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
