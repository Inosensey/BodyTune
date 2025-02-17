import React, { SVGProps } from "react";

type SolarRoundedMagniferLinearProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function SolarRoundedMagniferLinear(props: SolarRoundedMagniferLinearProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke={props.color} strokeWidth="1.5">
        <circle cx="11" cy="11" r="9"></circle>
        <path
          strokeLinecap="round"
          d="M21.812 20.975c-.063.095-.176.208-.403.434c-.226.227-.34.34-.434.403a1.13 1.13 0 0 1-1.62-.408c-.053-.1-.099-.254-.19-.561c-.101-.335-.151-.503-.161-.621a1.13 1.13 0 0 1 1.218-1.218c.118.01.285.06.621.16c.307.092.46.138.56.192a1.13 1.13 0 0 1 .409 1.619Z"
        ></path>
      </g>
    </svg>
  );
}
export default SolarRoundedMagniferLinear;
