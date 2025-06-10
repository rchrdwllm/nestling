"use client";

import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

const icons = [
  // Getting Started (Person)
  <svg
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="text-primary"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 16-4 16 0" />
  </svg>,
  // Navigating the Dashboard (Grid)
  <svg
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="text-primary"
  >
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
  </svg>,
  // Submitting Assignments (Document)
  <svg
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="text-primary"
  >
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h3" />
  </svg>,
  // Communication and Support (Chat)
  <svg
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="text-primary"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
];

const manualSections = [
  {
    title: "Getting Started",
    description: (
      <>Register, verify your email, and log in to access your dashboard.</>
    ),
  },
  {
    title: "Navigating the Dashboard",
    description: (
      <>Use the sidebar to access courses, messages, and analytics.</>
    ),
  },
  {
    title: "Submitting Assignments",
    description: (
      <>Go to Assignments, follow instructions, and upload your work.</>
    ),
  },
  {
    title: "Communication and Support",
    description: (
      <>Message instructors or classmates, and visit Help for support.</>
    ),
  },
];

const UserManual = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className={`w-full flex flex-col transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-xl font-semibold mb-8">User Manual</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {manualSections.map((section, idx) => (
          <Card
            key={section.title}
            className="flex flex-col items-center text-center flex-1 rounded-xl p-6"
          >
            <div className="mb-4">{icons[idx]}</div>
            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
            <p className="text-base text-muted-foreground">
              {section.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UserManual;
