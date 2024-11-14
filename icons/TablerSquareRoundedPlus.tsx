import React, { SVGProps } from "react";

type TablerSquareRoundedPlusProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function TablerSquareRoundedPlus(props: TablerSquareRoundedPlusProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width ? props?.width : '1em'}
      height={props?.height ? props?.height : '1em'}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9m3 9H9m3-3v6"
      ></path>
    </svg>
  );
}
export default TablerSquareRoundedPlus;
