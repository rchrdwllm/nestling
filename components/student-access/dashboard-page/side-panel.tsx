"use client";

import Image from "next/image";
import notifbell from "@/assets/notifbell.png";
import pending from "@/assets/pending.png";
import { Notification, PendingTask } from "@/types";

type SidePanelProps = {
  notifications: Notification[];
  pendingTasks: PendingTask[];
};

const SidePanel = ({ notifications, pendingTasks }: SidePanelProps) => {
  return (
    <div className="w-full lg:w-[400px] lg:sticky lg:top-10 relative bg-white lg:bg-transparent z-30 lg:z-0 p-4 lg:p-0 shadow-inner lg:shadow-none mt-6 lg:mt-4">
      <div className="space-y-6">
        {/* Notifications */}
        {notifications.length > 0 && (
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
              {notifications.map((notification, index) => (
                <li key={index} className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-900 font-semibold">
                      <span className="text-red-600">{notification.title}</span>{" "}
                      - {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      CS 001 - Introduction to Computing
                    </p>
                    <p className="text-xs text-gray-400">4h ago</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
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
              {pendingTasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-900 font-semibold">
                      {task.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {task.courseCode} - {task.courseName}
                    </p>
                    <p className="text-xs text-gray-400">{task.timeAgo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
