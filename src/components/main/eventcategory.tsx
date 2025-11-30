import Image from "next/image";

interface Props {
  title: string;
  events: string;
  image: string;
  gradient: string;
}

export default function EventCategoryCard({ title, events, image, gradient }: Props) {
  return (
    <div
      className={`rounded-2xl p-6 w-60 h-72 shrink-0 flex flex-col relative overflow-hidden text-white font-semibold snap-center ${gradient}`}
    >
      <div className="text-4xl font-bold leading-tight">{title}</div>
      <p className="text-sm opacity-90">{events}</p>

      <div className="w-full flex justify-center mt-auto absolute left-15 top-20">
        <Image
          src={image}
          alt={title}
          width={320}
          height={320}
          className="object-contain"
        />
      </div>
    </div>
  );
}
