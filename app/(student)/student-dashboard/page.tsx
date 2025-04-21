"use client";
import { useEffect, useRef } from "react";
import "./styles.css";
import SidePanel from "./side-panel";
import SearchBar from "./search-bar";
import Announcements from "./announcements";

const Dashboard = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  {/* Autoscroll Effect */}
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-[#EDE9DA] min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-gray-50 py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center h-full">
          <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
            STUDENT DASHBOARD
          </p>
        </div>
        <div className="sticky top-0 z-50 py-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-0 lg:space-x-6 overflow-y-auto"
      >
        {/* Announcements Section */}
        <div className="w-full lg:w-3/4 flex justify-center items-center">
          <Announcements />
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:bg-transparent bg-gray-50 rounded-lg shadow-md p-6 lg:p-0 lg:shadow-none lg:mt-0 mt-6">
          <SidePanel
            notifications={[
              {
                name: "John Doe",
                message: "Sent you a message",
                courseCode: "CS101",
                courseName: "Introduction to Computer Science",
                timeAgo: "35 minutes ago",
              },
            ]}
            pendingTasks={[
              {
                name: "Assignment 1.0 - Task Name",
                courseCode: "CS101",
                courseName: "Introduction to Computer Science",
                timeAgo: "8 hours ago",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
