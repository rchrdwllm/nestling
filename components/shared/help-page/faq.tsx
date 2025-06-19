"use client";

import { useState, useEffect } from "react";
import CreateTicketBtn from "./create-ticket-btn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import MotionWrapper from "@/components/wrappers/motion-wrapper";

const FAQDropdown = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-4">
      <button
        className={`w-full text-left flex justify-between items-center text-lg font-medium select-none transition-colors duration-200 group ${
          open ? "text-primary" : ""
        } hover:bg-muted-secondary rounded-lg p-2`}
        onClick={() => setOpen((o) => !o)}
      >
        {question}
        <span
          className={`ml-2 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          } flex items-center justify-center w-7 h-7`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <MotionWrapper
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="p-2 text-muted-foreground">{answer}</p>
      </MotionWrapper>
    </div>
  );
};

const Help = () => {
  const { user } = useCurrentUser();

  // Animate on enter and fade in
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex flex-col gap-10 transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      } pb-20`}
    >
      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl">Frequently Asked Questions:</h2>
        <div className="divide-y">
          {/* General Questions */}
          <FAQDropdown
            question="What is Nestling LMS?"
            answer={
              <>
                Nestling LMS is an all-in-one Learning Management System
                designed to streamline educational operations, offering tools
                for course management, project tracking, secure communication,
                and analytics.
              </>
            }
          />
          <FAQDropdown
            question="Who can use Nestling LMS?"
            answer={
              <>
                Nestling LMS is designed for instructors, students, and
                administrators within Leave a Nest, especially for the
                Philippine branch, but can be adapted for other organizations as
                well.
              </>
            }
          />
          {/* Account and Access */}
          <FAQDropdown
            question="How do I create an account on Nestling LMS?"
            answer={
              <>
                To create an account, click the Register button on the login
                page and fill out the required information. Follow the
                instructions sent to your email to complete registration.
              </>
            }
          />
          <FAQDropdown
            question="What should I do if I forget my password?"
            answer={
              <>
                Click on the "Forgot Password" link on the login page and follow
                the instructions to reset your password via your registered
                email address.
              </>
            }
          />
          {/* Support and Troubleshooting */}
          <FAQDropdown
            question="What should I do if I experience connectivity issues?"
            answer={
              <>
                If you experience connectivity issues, check your internet
                connection and try refreshing the page. If the problem persists,
                try accessing the platform from a different network or device.
                For ongoing issues, reach out to us for further assistance.
              </>
            }
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          {user.role !== "admin" && <CreateTicketBtn />}
          {user.role === "admin" ? (
            <Link href="/help/tickets">
              <Button variant="link">View all support tickets</Button>
            </Link>
          ) : (
            <Link href="/help/tickets">
              <Button variant="link">View your tickets</Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};
export default Help;
