import db from "../config/firebase";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import javlibData from "../config/javlibData.json";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { navDetail } from "../features/movieSlice";
import SearchList from "./SearchList";

/*const addfile = (e) => {
  e.preventDefault();
  const id = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");

  db.collection("collection").doc(id).set({
    code: "",
    image: [],
    keywords: [],
    name: [],
    publisher: "",
    title: "",
  });
};*/

function Header({ collections }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  console.log("collections", collections);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      collections.filter((collection) =>
        collection.code.includes(searchTerm.toLocaleUpperCase())
      )
    );
  };

  const navToDetails = () => {
    dispatch(navDetail({ id, code, image, name, title, publisher, keywords }));
    router.push(`/details/${id}`);
  };

  return (
    <div className="flex items-center p-4 space-x-10 sticky top-0 z-50 shadow-lg">
      <div className=" cursor-pointer" onClick={() => router.push("/")}>
        <h1 className="text-lg">My JavLib</h1>
      </div>
      <div className=" hidden sm:flex relative items-center rounded-md h-10 flex-grow cursor-pointer  bg-yellow-400  hover:bg-yellow-500">
        <input
          onMouseOver={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search anything you need... (Live Search by Filter)"
          className={`text-black p-2 px-5 h-full width-6 flex-grow rounded flex-shrink rounded-l-md focus:outline-none
         `}
          type="text"
        />
        {showResults && (
          <div
            onClick={() => setShowResults(true)}
            onMouseOver={() => setShowResults(true)}
            onMouseLeave={() => setShowResults(false)}
            className="absolute w-full bg-white bottom-0 z-50 rounded-md"
            style={{
              transform: "translateY(100%)",
              height: "auto",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {!!searchResults.length ? (
              searchResults.map((collection) => (
                <SearchList
                  id={collection.id}
                  code={collection.code}
                  image={collection.image}
                  name={collection.name}
                  title={collection.title}
                  keywords={collection.keywords}
                  publisher={collection.publisher}
                />
              ))
            ) : (
              <>
                {searchTerm && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    No product found
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex space-x-6 outline-none">
        <div
          onClick={() => router.push("/filter")}
          className="w-full outline-none hover:bg-gray-500 p-4 rounded-2xl cursor-pointer"
        >
          Filter
        </div>
        <div
          onClick={() => router.push("/search")}
          className="w-full outline-none    hover:bg-gray-500 p-4 rounded-2xl cursor-pointer"
        >
          Search
        </div>
      </div>
    </div>
  );
}

export default Header;
