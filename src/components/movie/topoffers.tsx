import { MdOutlineCheck } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const offers = [
  {
    title: "YES Private Debit Card Offer",
    subtitle: "Tap to view details",
  },
  {
    title: "Buy 1 get 1 movie ticket free + 50% off on non...",
    subtitle: "Tap to view details",
  },
];

export default function TopOffers() {
  return (
    <div className=" w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Top offers for you</h2>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="min-w-[320px] sm:min-w-[450px] bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl px-4 py-3 flex gap-3 items-start"
          >
            <MdOutlineCheck className="text-red-500 text-lg mt-1" />

            <div className="flex flex-col">
              <p className="font-semibold text-sm sm:text-base text-gray-900">
                {offer.title}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {offer.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* <button className="min-w-10 h-10 bg-gray-400/80 rounded-full flex justify-center items-center mt-3 shrink-0">
          <IoIosArrowForward className="text-white text-xl" />
        </button> */}
      </div>
    </div>
  );
}
