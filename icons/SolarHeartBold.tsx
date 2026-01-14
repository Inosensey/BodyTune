import React, { SVGProps } from "react";

type SolarHeartBoldProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function SolarHeartBold(props: SolarHeartBoldProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill={props.color}
        d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"
      />
    </svg>
  );
}
export default SolarHeartBold;
