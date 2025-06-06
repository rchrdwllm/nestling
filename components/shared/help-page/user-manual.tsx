"use client";

import React from "react";

const icons = [
  // Getting Started (Person)
  (
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
    </svg>
  ),
  // Navigating the Dashboard (Grid)
  (
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
    </svg>
  ),
  // Submitting Assignments (Document)
  (
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
    </svg>
  ),
  // Communication and Support (Chat)
  (
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
    </svg>
  ),
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

const UserManual = () => (
  <section className="w-full max-w-5xl mx-auto flex flex-col items-center mt-8">
    <h2 className="text-3xl font-bold mb-8">User Manual</h2>
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
      {manualSections.map((section, idx) => (
        <div
          key={section.title}
          className="flex flex-col items-center text-center flex-1 bg-background rounded-xl p-6 shadow"
        >
          <div className="mb-4">{icons[idx]}</div>
          <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
          <p className="text-base text-muted-foreground">
            {section.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default UserManual;