import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="">
      <div className="bg-white ">
        <input
          className=" bg-white	 text-black placeholder-black border-0 rounded-sm	focus:outline-none rounded-t-none p-4 h-16 w-60		"
          type="text"
          placeholder="Enter a flower name"
          value={wordEntered}
          onChange={handleFilter}
        />

        {filteredData.length === 0 ? (
          <SearchIcon className="w-14 h-10" />
        ) : (
          <CloseIcon
            onClick={clearInput}
            className="w-10 h-10 ml-6 cursor-pointer	  "
          />
        )}
      </div>
      {filteredData.length != 0 && (
        <div className="mt-1 h-40 w-60  ml-16 z-50 absolute	bg-white shadow-[0_5px_15px_rgba(0,0,0,0.3) overflow-x-hidden	overflow-y-auto">
          {filteredData.map((value, key) => {
            return (
              <a
                key={key}
                className="w-full h-10 flex items-center	no-underline	hover:bg-gray-400	"
                href={`/flowers/${value.productId}`}
              >
                <p className="ml-2.5">{value.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
