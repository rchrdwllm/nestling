"use client";

import { useState } from "react";
import CreateTicketBtn from "./create-ticket-btn";

// FAQDropdown component for animated dropdowns
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
        } hover:bg-secondary rounded-lg p-2`}
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
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out slider-content ${
          open ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
        style={
          {
            // maxHeight is set by class, but you can adjust if needed
          }
        }
      >
        <div className="text-muted-foreground px-2 pb-2">{answer}</div>
      </div>
    </div>
  );
};

const Help = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">
          Help | <span className="text-primary">FAQs</span>
        </h1>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions:
        </h2>
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
        <CreateTicketBtn />
        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-600 ease-in-out animate-fadeinout">
            <div className="bg-background rounded-xl p-8 w-full max-w-md shadow-lg relative transition-opacity duration-600 ease-in-out animate-fadeinout">
              <button
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
                onClick={() => {
                  // Add a short timeout to allow the fade-out animation before unmounting
                  const modal = document.querySelector(".animate-fadeinout");
                  if (modal) {
                    modal.classList.remove("animate-fadeinout");
                    modal.classList.add("animate-fadeout");
                  }
                  setTimeout(() => setShowRequestModal(false), 600);
                }}
              >
                ×
              </button>
              <h2 className="text-3xl font-bold text-center mb-2">
                Send a Ticket!
              </h2>
              <p className="text-center mb-6 text-lg">
                Tell us your concerns and we will get back to you soon.
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Implement backend integration here (send ticket to admin/database)
                  console.log("Name:", form.name);
                  console.log("Email:", form.email);
                  console.log("Message:", form.message); //testing purposes
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-400 py-2 px-1 text-lg"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-400 py-2 px-1 text-lg"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
                <textarea
                  placeholder="Message"
                  className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-400 py-2 px-1 text-lg resize-none"
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
                <button
                  type="submit"
                  className="mt-4 bg-primary text-white font-semibold py-3 rounded-full text-lg transition-colors flex items-center justify-center gap-2 hover:bg-primary/80"
                >
                  SUBMIT <span className="text-xl">→</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
export default Help;
