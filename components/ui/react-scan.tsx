"use client";

import { scan } from "react-scan";
import { JSX, useEffect } from "react";

const ReactScan = (): JSX.Element => {
  useEffect(() => {
    scan({
      enabled: false,
    });
  }, []);

  return <></>;
};

export default ReactScan;
