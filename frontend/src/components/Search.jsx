import { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";

const Search = ({ placeholder, searchSetter }) => {
  const [input, setInput] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      //hae db hakusanalla, aseta
      searchSetter(input);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex rounded-lg bg-custom-isabelline">
        <input
          type="text"
          onChange={handleInput}
          onKeyDown={handleEnter}
          placeholder={placeholder}
          className="rounded-s-lg border-r border-r-gray-300 bg-custom-isabelline px-2 py-1"
        />
        <button
          type="button"
          onClick={() => searchSetter(input)}
          className="rounded-e-lg border-l-custom-onyx bg-custom-isabelline px-2 text-sm text-custom-text hover:bg-gray-300"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Search;
