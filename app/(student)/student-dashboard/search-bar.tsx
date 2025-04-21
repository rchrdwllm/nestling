import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className= "flex justify-center items-center w-full max-w-md mx-auto mt-4 mb-4">
            <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full max-w-md p-2 border border-gray-300 rounder-full shawdow-sm focus:outline-none
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
        </div>
    );
};