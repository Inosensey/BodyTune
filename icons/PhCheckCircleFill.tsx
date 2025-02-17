import React, { SVGProps } from "react";

type PhCheckCircleFillProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function PhCheckCircleFill(props: PhCheckCircleFillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={props.color}
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
      ></path>
    </svg>
  );
}
export default PhCheckCircleFill;
