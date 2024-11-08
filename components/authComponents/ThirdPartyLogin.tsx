"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Actions
import { loginWithThirdParty } from "@/actions/authActions";

// Types
import { formReturnType } from "@/types/formTypes";

interface props {
  // provider: string;
  buttonName: string;
  backgroundColor: string;
  Icon: React.ComponentType<{ color: string; width?: string; height?: string }>;
  textBackground: string;
  action: string,
  testId: string,
  provider: string
}

// Initials
const useFormStateInitials: formReturnType<
  { redirectLink: string; loginType: string } | []
> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const ThirdPartyLogin = ({
  Icon,
  backgroundColor,
  buttonName,
  textBackground,
  action,
  testId,
  provider
}: props) => {
  // Initialize router
  const router = useRouter()

  // UseFormState
  const [state, formAction] = useFormState(
    loginWithThirdParty,
    useFormStateInitials
  );

  useEffect(() => {
    if(state.success !== null || state.error !== null) {
      if (!Array.isArray(state.data)) {
        router.push(state.data.redirectLink)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])
  return (
    <motion.form
      data-testid={`${testId}`}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      className="border-[1px] border-secondary w-full rounded-md flex justify-center"
      action={formAction}
    >
      <input type="hidden" name="provider" value={provider} />
      <button className="px-1 py-2 font-semibold font-dmSans flex items-center gap-2  text-center">
        <Icon color={backgroundColor} height="1.4em" width="1.4em" />{" "}
        <span>
          {action}{" "}
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
    </motion.form>
  );
};

export default ThirdPartyLogin;
