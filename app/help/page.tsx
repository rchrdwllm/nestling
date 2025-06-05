"use client";

import React, { useEffect, useState } from "react";
import Help from "@/components/shared/help-page/faq";
import LoadingScreen from "@/components/shared/help-page/loadingscreen";

const HelpPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;
  return <Help />;
};

export default HelpPage;
