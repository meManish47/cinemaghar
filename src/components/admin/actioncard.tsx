import Link from "next/link";

export default function ActionCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <Link
        href={href}
        className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
      >
        Manage
      </Link>
    </div>
  );
}