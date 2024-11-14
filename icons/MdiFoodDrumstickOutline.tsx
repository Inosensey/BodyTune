import React, { SVGProps } from "react";

type MdiFoodDrumstickOutlineProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function MdiFoodDrumstickOutline(props: MdiFoodDrumstickOutlineProps) {
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
        d="M15.71 4c.83 0 1.62.22 2.29.66c1.14.74 1.84 1.87 2 3.18a4.37 4.37 0 0 1-1.25 3.47c-.7.69-1.59 1.13-2.57 1.23c-1.91.2-3.59.96-4.84 2.23a.81.81 0 0 1-1.13 0l-.99-.99a.74.74 0 0 1-.22-.53c0-.25.11-.47.32-.68c1.21-1.22 1.95-2.84 2.13-4.7c.13-1.33.84-2.47 2-3.22c.66-.43 1.44-.65 2.26-.65m0-2c-1.17 0-2.34.32-3.35.97c-1.76 1.13-2.73 2.89-2.9 4.71c-.13 1.32-.63 2.55-1.55 3.47l-.03.03c-1.16 1.16-1.16 2.93-.07 4.01l.99.99c.55.55 1.26.82 1.97.82s1.43-.27 1.98-.82c.97-.97 2.25-1.5 3.64-1.65c1.37-.15 2.71-.75 3.77-1.8A6.27 6.27 0 0 0 19.09 3c-1.01-.67-2.19-1-3.38-1M6.26 19.86c.27.56.18 1.24-.29 1.7a1.49 1.49 0 0 1-2.55-.98a1.49 1.49 0 0 1-.98-2.55c.46-.46 1.15-.56 1.7-.29l2.48-2.43c.14.19.3.41.48.59l.99.99c.21.2.41.37.67.52z"
      ></path>
    </svg>
  );
}
export default MdiFoodDrumstickOutline;
