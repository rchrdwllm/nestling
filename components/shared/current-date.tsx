"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setCurrentDate(now.toLocaleString("en-US", options));
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60 * 1000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return <p className="text-gray-500 text-sm">{currentDate}</p>;
};

export default CurrentDate;
