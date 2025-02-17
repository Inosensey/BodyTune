import React, { SVGProps } from "react";

type SolarStarsMinimalisticLineDuotoneProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function SolarStarsMinimalisticLineDuotone(
  props: SolarStarsMinimalisticLineDuotoneProps
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke={props.color}>
        <path
          strokeWidth="1.5"
          d="M10.08 7.897C11.157 5.966 11.695 5 12.5 5s1.343.966 2.42 2.897l.278.5c.306.549.46.823.698 1.004s.535.248 1.13.383l.54.122c2.091.473 3.137.71 3.385 1.51c.249.8-.464 1.633-1.89 3.3l-.368.43c-.405.474-.607.711-.699 1.004c-.09.293-.06.609.001 1.24l.056.576c.216 2.224.323 3.336-.328 3.83s-1.63.044-3.587-.857l-.507-.234c-.556-.256-.834-.384-1.129-.384s-.573.128-1.13.384l-.506.234c-1.957.9-2.936 1.352-3.587.857c-.651-.494-.543-1.606-.328-3.83l.056-.575c.061-.632.092-.948 0-1.24c-.09-.294-.293-.53-.698-1.004l-.369-.432c-1.425-1.666-2.138-2.5-1.89-3.3c.25-.8 1.295-1.036 3.386-1.509l.54-.122c.595-.135.892-.202 1.13-.383c.239-.18.392-.455.698-1.004z"
        ></path>
        <path
          strokeLinejoin="round"
          d="M4.99 2s.288 1.458.92 2.085C6.54 4.712 8 4.99 8 4.99s-1.458.288-2.085.92C5.288 6.54 5.01 8 5.01 8s-.288-1.458-.92-2.085C3.46 5.288 2 5.01 2 5.01s1.458-.288 2.085-.92C4.712 3.46 4.99 2 4.99 2Z"
          opacity=".55"
        ></path>
        <path
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M18 5h2m-1 1V4"
          opacity=".55"
        ></path>
      </g>
    </svg>
  );
}
export default SolarStarsMinimalisticLineDuotone;
