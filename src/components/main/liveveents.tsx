import EventCategoryCard from "./eventcategory";

const categories = [
  {
    title: "Comedy Shows",
    events: "250+ Events",
    image: "/person.png",
    gradient: "bg-gradient-to-br from-pink-500 to-purple-600",
  },
  {
    title: "Amusement Park",
    events: "15+ Events",
    image: "/amusement.png",
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    title: "Theatre Shows",
    events: "90+ Events",
    image: "/theater.png",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-700",
  },
  {
    title: "Kids",
    events: "40+ Events",
    image: "/kids.png",
    gradient: "bg-gradient-to-br from-sky-400 to-purple-400",
  },
  {
    title: "Adventure & Fun",
    events: "10+ Events",
    image: "/travel.png",
    gradient: "bg-gradient-to-br from-teal-500 to-blue-700",
  },
];

export default function LiveEventsSection() {
  return (
    <div className="my-10 w-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide ">
        {categories.map((cat) => (
          <EventCategoryCard key={cat.title} {...cat} />
        ))}
      </div>
    </div>
  );
}
