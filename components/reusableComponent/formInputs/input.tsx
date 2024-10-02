"use client"

import style from "@/css/reusableComponent/Input.module.css";

interface inputParams<T> {
  state: T extends string ? T : string;
  type: string;
  name: string;
  placeholder: string;
  label?: string;
  valid?: null | boolean | undefined;
  validationMessage?: string;
  autoComplete?: string,
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
  }: inputParams<T>) => {
    return (
      <div className={`flex flex-col phone:w-[96%] mdphone:w-11/12 laptop:w-full`}>
        <label className="phone:text-sm">{label}</label>
        <div className="w-full relative bg-primary overflow-hidden p-1">
          <input
            value={state}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onInput}
            type={type}
            name={name}
            placeholder={placeholder}
            className={`bg-transparent w-full text-white px-2 py-2 phone:text-sm ${style.input}`}
            autoComplete={autoComplete}
            // required
          />
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