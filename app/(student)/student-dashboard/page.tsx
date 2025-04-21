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
    <div
      ref={scrollContainerRef}
      className="bg-[#EDE9DA] py-24 sm:py-0 max-h-screen">
      <div className="sticky top-0 z-50 bg-gray-50 py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center h-full">
          <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
            STUDENT DASHBOARD
          </p>
        </div>
        <div className="sticky top-0 z-50 py-6 ">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <SearchBar />
          </div>
        </div>

      </div>
      <div className="flex">
        <div className="absolute top-25 right-0 h-screen w-64">
          <SidePanel />
        </div>
      </div>

    <Announcements />
    </div>
  );
};

export default Dashboard;
