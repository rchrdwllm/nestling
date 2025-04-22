"use client";

const announcementsData = [
  {
    id: 1,
    title: "Announcement #1",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt...",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80",
  },
  {
    id: 2,
    title: "Announcement #2",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt...",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80",
  },
  {
    id: 3,
    title: "Announcement #3",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt...",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80",
  },
  {
    id: 4,
    title: "Announcement #4",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt...",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80",
  },
  {
    id: 5,
    title: "Announcement #5",
    description: "Anim aute id magna aliqua ad ad non deserunt sunt...",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?...&q=80",
  },
];

const Announcements = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 mb-12 pr-[22px] bg-white rounded-xl p-8 shadow-2xl ml-1 mt-4 z-0 relative">
      {announcementsData.map((announcement) => (
        <div key={announcement.id} className="space-y-6 px-4 sm:px-8">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden border border-black mt-4 transition-all duration-300 hover:scale-[102%] hover:bg-opacity-30 hover:bg-gray-900">
            <div className="absolute inset-0 z-0">
              <img
                alt={announcement.title}
                src={announcement.image}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-gray-900 bg-opacity-20 z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {announcement.title}
              </h2>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
                {announcement.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcements;