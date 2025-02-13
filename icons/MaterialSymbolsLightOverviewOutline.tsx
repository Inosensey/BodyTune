import React, { SVGProps } from "react";

type MaterialSymbolsLightOverviewOutlineProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function MaterialSymbolsLightOverviewOutline(
  props: MaterialSymbolsLightOverviewOutlineProps
) {
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
        d="m19.675 20.337l.546-.547l-1.836-1.836V15.23h-.77v3.046zM5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V5.615q0-.67.472-1.143Q4.944 4 5.615 4h12.77q.67 0 1.143.472q.472.472.472 1.143v5.95q-.263-.09-.504-.147T19 11.306v-5.69q0-.231-.192-.424T18.385 5H5.615q-.23 0-.423.192T5 5.615v12.77q0 .23.192.423t.423.192h5.666q.036.28.093.521t.147.479zM5 18v1V5v6.306v-.075zm2.5-1.73h3.96q.055-.257.15-.497t.2-.504H7.5zm0-3.77h6.58q.493-.346.97-.587t1.027-.376V11.5H7.5zm0-3.77h9v-1h-9zM18 22.116q-1.671 0-2.836-1.164T14 18.115t1.164-2.835T18 14.115t2.836 1.165T22 18.115t-1.164 2.836T18 22.115"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsLightOverviewOutline;
