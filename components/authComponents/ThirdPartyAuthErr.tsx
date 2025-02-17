"use client";

import React, { useEffect, useState } from "react";

const ThirdPartyAuthErr = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice());
    if (typeof window !== undefined) {
      setErrorCode(params.get("#error"));
      setErrorDesc(params.get("error_description"));
    }
  }, []);

  const [errorCode, setErrorCode] = useState<string | null>("");
  const [errorDesc, setErrorDesc] = useState<string | null>("");
  return (
    <div>
      <p>Error: {errorCode}</p>
      <p>Error Description: {errorDesc}</p>
    </div>
  );
};

export default ThirdPartyAuthErr;
