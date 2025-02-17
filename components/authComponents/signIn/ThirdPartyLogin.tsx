"use client";
import { motion } from "framer-motion";

interface props {
  // provider: string;
  buttonName: string;
  backgroundColor: string;
  Icon: React.ComponentType<{ color: string; width?: string; height?: string }>;
  textBackground: string;
  testId: string
}

const ThirdPartyLogin = ({
  Icon,
  backgroundColor,
  buttonName,
  textBackground,
  testId
}: props) => {
  return (
    <motion.div
      data-testid={`${testId}`}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      className="border-[1px] border-secondary w-full rounded-md"
    >
      <button className="w-full px-1 py-2 font-semibold font-dmSans flex items-center gap-5 pl-12 text-center">
        <Icon color={backgroundColor} height="1.4em" width="1.4em" />{" "}
        <span>
          Login with{" "}
          <span
            style={{
              background: `${textBackground}`,
              color: "transparent",
              backgroundClip: "text",
            }}
          >
            {buttonName}
          </span>
        </span>
      </button>
    </motion.div>
  );
};

export default ThirdPartyLogin;
