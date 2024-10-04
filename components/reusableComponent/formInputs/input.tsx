"use client";

import { useState } from "react";
import style from "@/css/reusableComponent/Input.module.css";

// icons
import MdiEyeOffOutline from "@/icons/MdiEyeOffOutline";
import MdiEyeOutline from "@/icons/MdiEyeOutline";

interface inputParams<T> {
  state: T extends string ? T : string;
  type: string;
  name: string;
  placeholder: string;
  label?: string;
  valid?: null | boolean | undefined;
  validationMessage?: string;
  autoComplete?: string;
  dataTestId?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = <T extends string | number>({
  state,
  type,
  name,
  autoComplete,
  onChange,
  onBlur,
  onInput,
  placeholder,
  label,
  valid,
  validationMessage,
  dataTestId
}: inputParams<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      className={`flex flex-col phone:w-[96%] mdphone:w-11/12 laptop:w-full`}
    >
      <label className="phone:text-sm font-quickSand font-semibold">{label}</label>
      <div className="w-full relative bg-primary overflow-hidden p-1">
        <input
          data-testid={dataTestId}
          value={state}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          type={type !== "password" ? type : showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          className={`bg-transparent w-[92%] text-white px-2 py-2 phone:text-sm ${style.input} font-quickSand`}
          autoComplete={autoComplete}
          // required
        />
        {type === "password" && (
          <>
            {showPassword && (
              <MdiEyeOutline
                onClick={toggleShowPassword}
                color="#e0e1dd"
                className="cursor-pointer absolute -translate-y-[50%] top-[50%] right-2"
                width="1.4em"
                height="1.4em"
              />
            )}
            {!showPassword && (
              <MdiEyeOffOutline
                onClick={toggleShowPassword}
                color="#e0e1dd"
                className="cursor-pointer absolute -translate-y-[50%] top-[50%] right-2"
                width="1.4em"
                height="1.4em"
              />
            )}
          </>
        )}

        <div
          className={`h-[4px] w-full bg-LightPrimary absolute ${style.inputUnderline}`}
        ></div>
      </div>
      {valid != null ? (
        valid === true ? (
          ""
        ) : (
          <span className="text-[0.75rem] text-red-500 font-bold">
            {validationMessage}
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
};
