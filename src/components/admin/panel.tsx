import Link from "next/link";

export default function Panel({
  title,
  children,
  link,
  linkLabel,
}: {
  title: string;
  children: any;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {link && (
          <Link
            href={link}
            className="text-xs text-red-600 hover:underline font-medium"
          >
            {linkLabel}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
