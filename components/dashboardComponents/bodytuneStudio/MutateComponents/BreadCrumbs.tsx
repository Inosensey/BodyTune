"use client";
import { motion } from "framer-motion";
import style from "@/css/BreadCrumbs.module.css"

// Types
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  selectedBreadCrumb: InterfaceBreadCrumbs;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
  breadCrumbs: Array<InterfaceBreadCrumbs>;
}


const BreadCrumbs = ({
  breadCrumbs,
  setSelectedBreadCrumb,
  selectedBreadCrumb,
}: props) => {
  return (
    <div className="flex border-[1.5px] border-secondary">
      {breadCrumbs.map((breadcrumb: InterfaceBreadCrumbs) => (
        <motion.div
          onClick={() => setSelectedBreadCrumb(breadcrumb)}
          key={breadcrumb.id}
          className={`group bg-black px-4 py-4 cursor-pointer relative ${style.breadcrumbs}`}
        >
          <p
            className={`text-base font-dmSans font-semibold transition duration-200 ${
              selectedBreadCrumb.id === breadcrumb.id
                ? "text-[#a3e09f]"
                : "text-[#D3F0D1] group-hover:text-[#a3e09f]"
            }`}
          >
            {breadcrumb.title}
          </p>
          <p
            className={`font-quickSand text-[0.8rem] transition duration-200 ${
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
