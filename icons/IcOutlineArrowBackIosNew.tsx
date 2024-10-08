import React, { SVGProps } from "react";

type IcOutlineArrowBackIosNewProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};


export function IcOutlineArrowBackIosNew(props: IcOutlineArrowBackIosNewProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
      ></path>
    </svg>
  );
}
export default IcOutlineArrowBackIosNew;
