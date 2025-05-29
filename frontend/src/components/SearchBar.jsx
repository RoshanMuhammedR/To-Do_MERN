import { FiSearch } from "react-icons/fi"

const SearchBar = () => {
  return (
    <div>
        <div className="relative w-full px-2">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
        </div>
    </div>
  )
}

export default SearchBar