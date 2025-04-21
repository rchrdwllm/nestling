"use client";
import "./styles.css";
import Image from "next/image";
import notifbell from "@/assets/notifbell.png";
import pending from "@/assets/pending.png";

const SidePanel = () => {
  return (
    <div className="hidden lg:block fixed right-6 top-30 w-[400px] z-30 mr-10 mt-4">
      <div className="space-y-6">

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-xl border border-black-900 p-6">
          <h3 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Image
              src={notifbell}
              alt="Notification Bell"
              width={48}
              height={48}
              className="mr-2"
            />
            Notifications
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              
              {/* PLACEHOLDER NOTIF #1 */} {/* To be replaced with working functions */}
              <div>
                <p className="text-sm text-gray-900 font-semibold">
                  <span className="text-red-600">[NAME]</span> - Sent you a
                  message.
                </p>
                <p className="text-xs text-gray-500">COURSE CODE - COURSE NAME</p>
                <p className="text-xs text-gray-400">35 minutes ago</p>
              </div>

            </li>
            <li className="flex items-start">

              {/* PLACEHOLDER NOTIF #2 */} {/* To be replaced with working functions */}
              <div>
              <p className="text-red-600">[COURSE CODE] <span className="text-sm text-gray-900 font-semibold">
                  - Announcement 
                </span></p> 
                <p className="text-xs text-gray-500">COURSE NAME</p>
                <p className="text-xs text-gray-400">5 minutes ago</p>
              </div>

            </li>
          </ul>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow-xl border border-black-900 p-6">
          <h3 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Image
              src={pending}
              alt="Pending Tasks"
              width={40}
              height={40}
              className="mr-2"
            />
          Pending Tasks
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              {/* PLACEHOLDER PENDING TASK #1 */} {/* To be replaced with working functions */}
              <div>
                <p className="text-sm text-gray-900 font-semibold">
                  Assignment 1.0 - Task Name
                </p>
                <p className="text-xs text-gray-500">COURSE CODE - COURSE NAME</p>
                <p className="text-xs text-gray-400">8 hours ago</p>
              </div>
            </li>
            <li className="flex items-start">
              {/* PLACEHOLDER PENDING TASK #2 */} {/* To be replaced with working functions */}
              <div>
                <p className="text-sm text-gray-900 font-semibold">
                  Assignment 2.0 - Task Name
                </p>
                <p className="text-xs text-gray-500">COURSE CODE - COURSE NAME</p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
