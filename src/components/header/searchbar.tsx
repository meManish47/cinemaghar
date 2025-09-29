import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <main className="h-8">
      <form className="flex gap-2 h-full w-max items-center border-1 border-gray-300 px-2 rounded-xs ">
        <button type="submit" className="cursor-pointer">
          <FaSearch color="gray" />
        </button>
        <input
          type="text"
          className="w-120 rounded-xs border-0 h-full px-2 focus:outline-0 focus:border-none focus:ring-0 "
          placeholder="Search for movies"
        />
      </form>
    </main>
  );
}
