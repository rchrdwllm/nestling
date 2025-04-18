"use client";
import { useEffect, useRef } from "react";
import FeatureCard from "@/components/ui/FeatureCard";
import "./styles.css";

const Dashboard = () => {
  // Reference for the container to scroll
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll effect after a certain delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 3000); // delay before scrolling

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="bg-[#EDE9DA] py-24 sm:py-0 overflow-y-auto max-h-screen"
    >
      <div className="sticky top-0 z-50 bg-gray-50 py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center h-full">
          <h2 className="text-center text-base/7 font-semibold text-black sm:text-xl">
            WELCOME TO
          </h2>
          <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
            STUDENT DASHBOARD
          </p>
        </div>
      </div>

      {/* Notifications and Pending Tasks Sidebar */}
      <div className="hidden lg:block fixed right-6 top-30 w-[400px] z-30 mr-10 mt-4">
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <img
                src="https://hollyandivy.com.au/cdn/shop/files/DCH009.jpg?v=1712093551&width=1946"
                alt="Notification Bell"
                className="w-6 h-6 mr-2" // You can adjust the size using width (w-6) and height (h-6)
              />
              Notifications
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="material-icons text-[var(--nestling-color)] mr-3">
                  message
                </span>
                <div>
                  <p className="text-sm text-gray-900 font-semibold">
                    <span className="text-red-600">[NAME]</span> - Sent you a
                    message.
                  </p>
                  <p className="text-xs text-gray-500">
                    COURSE CODE - COURSE NAME
                  </p>
                  <p className="text-xs text-gray-400">35 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[var(--nestling-color)] mr-3">
                  campaign
                </span>
                <div>
                  <p className="text-sm text-gray-900 font-semibold">
                    Announcement{" "}
                    <span className="text-red-600">[COURSE CODE]</span>
                  </p>
                  <p className="text-xs text-gray-500">COURSE NAME</p>
                  <p className="text-xs text-gray-400">5 minutes ago</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="material-icons text-[var(--nestling-color)] mr-2">
                assignment
              </span>
              Pending Tasks
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="material-icons text-[var(--nestling-color)] mr-3">
                  task
                </span>
                <div>
                  <p className="text-sm text-gray-900 font-semibold">
                    Assignment 1.0 - Task Name
                  </p>
                  <p className="text-xs text-gray-500">
                    COURSE CODE - COURSE NAME
                  </p>
                  <p className="text-xs text-gray-400">8 hours ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-[var(--nestling-color)] mr-3">
                  task
                </span>
                <div>
                  <p className="text-sm text-gray-900 font-semibold">
                    Assignment 2.0 - Task Name
                  </p>
                  <p className="text-xs text-gray-500">
                    COURSE CODE - COURSE NAME
                  </p>
                  <p className="text-xs text-gray-400">3 hours ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENT WRAPPER */}
      <div className="w-full max-w-7xl mx-auto space-y-10 mb-12 pr-[22px] bg-white rounded-xl p-8 shadow-2xl ml-10 mt-4 z-0 relative">
        {/* CARD #1 */}
        <div className="space-y-6 px-4 sm:px-8">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden border border-black mt-4 transition-all duration-300 hover:scale-[102%] hover:bg-opacity-30 hover:bg-gray-900">
            <div className="absolute inset-0 z-0">
              <img
                alt="Background Image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-gray-900 bg-opacity-20 z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Announcement!
              </h2>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt...
              </p>
            </div>
          </div>
        </div>

        {/* CARD #2 */}
        <div className="space-y-6 px-4 sm:px-8">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden border border-black mt-4 transition-all duration-300 hover:scale-[102%] hover:bg-opacity-30 hover:bg-gray-900">
            <div className="absolute inset-0 z-0">
              <img
                alt="Background Image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-gray-900 bg-opacity-20 z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Announcement!
              </h2>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt...
              </p>
            </div>
          </div>
        </div>

        {/* CARD #3 */}
        <div className="space-y-6 px-4 sm:px-8">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden border border-black mt-4 transition-all duration-300 hover:scale-[102%] hover:bg-opacity-30 hover:bg-gray-900">
            <div className="absolute inset-0 z-0">
              <img
                alt="Background Image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-gray-900 bg-opacity-20 z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Announcement!
              </h2>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt...
              </p>
            </div>
          </div>
        </div>

        {/* CARD #4 */}
        <div className="space-y-6 px-4 sm:px-8">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden border border-black mt-4 transition-all duration-300 hover:scale-[102%] hover:bg-opacity-30 hover:bg-gray-900">
            <div className="absolute inset-0 z-0">
              <img
                alt="Background Image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-gray-900 bg-opacity-20 z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Announcement!
              </h2>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt...
              </p>
            </div>
          </div>
        </div>

        {/* CARD #5 */}
        <div className="space-y-6 px-4 sm:px-8">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden border border-black mt-4 transition-all duration-300 hover:scale-[102%] hover:bg-opacity-30 hover:bg-gray-900">
            <div className="absolute inset-0 z-0">
              <img
                alt="Background Image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-gray-900 bg-opacity-20 z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Announcement!
              </h2>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt...
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ANNOUNCEMENT WRAPPER END */}
    </div>
  );
};

export default Dashboard;
