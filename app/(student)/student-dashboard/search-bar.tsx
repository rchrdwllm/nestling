import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className= "flex justify-center items-center w-full max-w-md mx-auto mt-4 mb-4">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full max-w-md p-2 border border-gray-300 rounded-full shawdow-sm focus:outline-none
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    onClick={() => console.log("USER SEARCHED")} // Placeholder function for search action
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 
                               hover:text-gray-600 focus:outline-none">
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;