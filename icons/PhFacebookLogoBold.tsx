import React, { SVGProps } from "react";

type PhFacebookLogoBoldProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function PhFacebookLogoBold(props: PhFacebookLogoBoldProps) {
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
        d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m12 191.13V156h20a12 12 0 0 0 0-24h-20v-20a12 12 0 0 1 12-12h16a12 12 0 0 0 0-24h-16a36 36 0 0 0-36 36v20H96a12 12 0 0 0 0 24h20v55.13a84 84 0 1 1 24 0"
      ></path>
    </svg>
  );
}
export default PhFacebookLogoBold;
