// path/to/ReactScanComponent

"use client";
// react-scan must be imported before react
import { scan } from "react-scan";
import { JSX, useEffect } from "react";

const ReactScan = (): JSX.Element => {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
};

export default ReactScan;
