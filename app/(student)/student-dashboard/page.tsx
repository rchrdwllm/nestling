"use client";
import { useEffect, useRef } from "react";
import "./styles.css";
import SidePanel from "./side-panel";

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
          <h2 className="text-center text-base/7 font-semibold text-black sm:text-xl">
            WELCOME TO
          </h2>
          <p className="mx-auto mt-2 max-w-full text-center text-4xl font-bold tracking-tight text-[var(--nestling-color)] sm:text-7xl break-words">
            STUDENT DASHBOARD
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="absolute top-25 right-0 h-screen w-64">
          <SidePanel />
          <div className="flex-1">
            {/* Main content goes here */}
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENT WRAPPER */} {/* To be replaced with working functions */}
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
