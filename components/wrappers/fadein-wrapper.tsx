"use client";
import React, { useEffect, useState } from "react";

const FadeInWrapper = ({
  children,
  duration = 700,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: show ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;