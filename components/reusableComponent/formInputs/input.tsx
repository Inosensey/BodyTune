"use client";

import { useState } from "react";
import style from "@/css/reusableComponent/Input.module.css";

// icons
import MdiEyeOffOutline from "@/icons/MdiEyeOffOutline";
import MdiEyeOutline from "@/icons/MdiEyeOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

interface inputParams<T> {
  state: T extends string ? T : string;
  type?: string;
  name: string;
  placeholder?: string;
  label?: string;
  shortDescription?: string;
  valid?: null | boolean | undefined;
  validationMessage?: string;
  autoComplete?: string;
  deletableInput?: boolean;
  dataTestId?: string;
  deleteInputFn?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface textareaInputParam {
  state: string;
  name: string;
  label: string;
  cols: number;
  rows: number;
  valid?: null | boolean | undefined;
  validationMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
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
  shortDescription,
  valid,
  validationMessage,
  dataTestId,
  deletableInput = false,
  deleteInputFn,
}: inputParams<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`flex flex-col w-full laptop:w-full gap-1`}>
      {label && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label className="phone:text-sm font-quickSand font-semibold">
              {label}
            </label>
            {shortDescription && (
              <p className="text-[#999999] text-xs font-semibold font-dmSans">
                {shortDescription}
              </p>
            )}
          </div>
          {deletableInput && (
            <button
              onClick={() => deleteInputFn && deleteInputFn()}
              className="cursor-pointer flex gap-1 items-center bg-fadedWarningColor text-white font-quickSand font-semibold text-sm rounded-md py-1 px-2 justify-center transition duration-200 hover:bg-warningColor"
            >
              <p className="text-xs font-semibold font-dmSans">Remove</p>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-lg"
              />
            </button>
          )}
        </div>
      )}
      <div
        className="w-full relative bg-primary overflow-hidden p-1"
        style={{
          border: valid === null ? "" : valid ? "" : "1px solid rgb(239 68 68)",
        }}
      >
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
          <span className="text-[0.75rem] text-red-500 font-bold font-dmSans">
            {validationMessage}
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export const TextareaInput = ({
  label,
  name,
  state,
  cols,
  rows,
  onBlur,
  onChange,
  valid,
  validationMessage,
}: textareaInputParam) => {
  return (
    <div className="flex flex-col w-full laptop:w-full gap-2">
      <label className="phone:text-sm font-quickSand font-semibold">
        {label}
      </label>

      <div
        className="w-full relative bg-primary overflow-hidden p-1"
        style={{
          border: valid === null ? "" : valid ? "" : "1px solid rgb(239 68 68)",
        }}
      >
        <textarea
          className="bg-transparent w-full text-white p-1 phone:text-sm font-quickSand resize-none"
          name={name}
          value={state}
          cols={cols}
          rows={rows}
          onChange={onChange}
          onBlur={onBlur}
        ></textarea>
      </div>
      {valid != null ? (
        valid === true ? (
          ""
        ) : (
          <span className="text-[0.75rem] text-red-500 font-bold font-dmSans">
            {validationMessage}
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export const CheckBoxInput = <T extends string | number>({
  state,
  name,
  onChange,
  onBlur,
  onInput,
  label,
  shortDescription,
  valid,
  validationMessage,
  dataTestId,
}: inputParams<T>) => {
  return (
    <div
      className={`flex flex-col items-center phone:w-[96%] mdphone:w-11/12 laptop:w-full gap-2`}
    >
      <div className="flex items-center gap-4 justify-center w-full">
        <input
          data-testid={dataTestId}
          value={state}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          type="checkbox"
          name={name}
          id={name}
          style={{ color: "red" }}
          className={`text-secondary p-4 phone:text-lg ${style.input} font-quickSand`}
          // required
        />
        <div className="flex flex-col w-9/12">
          {label && (
            <label
              htmlFor={name}
              className="phone:text-sm font-quickSand font-semibold"
            >
              {label}
            </label>
          )}
          {shortDescription && (
            <p className="text-[#999999] text-xs font-semibold font-dmSans">
              {shortDescription}
            </p>
          )}
        </div>
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
