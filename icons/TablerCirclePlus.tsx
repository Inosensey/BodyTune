import React, { SVGProps } from "react";

type TablerCirclePlusProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function TablerCirclePlus(props: TablerCirclePlusProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m6 0h6m-3-3v6"
      ></path>
    </svg>
  );
}
export default TablerCirclePlus;
