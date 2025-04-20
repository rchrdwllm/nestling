const Sidepanel = () => {

  {/* Notifications and Pending Tasks Sidebar */}
  <div className="hidden lg:block fixed right-6 top-30 w-[400px] z-30 mr-10 mt-4">
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <img
            src="/assets/notification-bell.png"
            alt="Notification Bell"
            className="w-6 h-6 mr-2"
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
              <p className="text-xs text-gray-500">COURSE CODE - COURSE NAME</p>
              <p className="text-xs text-gray-400">35 minutes ago</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="material-icons text-[var(--nestling-color)] mr-3">
              campaign
            </span>
            <div>
              <p className="text-sm text-gray-900 font-semibold">
                Announcement <span className="text-red-600">[COURSE CODE]</span>
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
              <p className="text-xs text-gray-500">COURSE CODE - COURSE NAME</p>
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
              <p className="text-xs text-gray-500">COURSE CODE - COURSE NAME</p>
              <p className="text-xs text-gray-400">3 hours ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>;
  
};

export default Sidepanel;
