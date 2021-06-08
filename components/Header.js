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

import HeaderItems from "./HeaderItems";
import {
  AdjustmentsIcon,
  BadgeCheckIcon,
  CollectionIcon,
  FireIcon,
  GlobeAltIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(
      collections.filter((collection) =>
        collection.code.includes(searchTerm.toLocaleUpperCase())
      )
    );
  };

  const navtoHome = () => {
    router.push("/");
  };

  const navtosearch = () => {
    router.push("/search");
  };

  const navtofilter = () => {
    router.push("/filter");
  };

  const navtowebsite = () => {
    router.push("/website");
  };

  const navtoRank = () => {
    router.push("/rank");
  };

  return (
    <div className="flex flex-col items-center sticky top-0 z-50 shadow-lg h-auto m-5">
      <div className="flex items-center space-x-6">
        <div className="flex flex-grow justify-evenly max-w-2xl">
          <HeaderItems title="HOME" Icon={HomeIcon} navtoHome={navtoHome} />
          <HeaderItems
            title="FILTER"
            Icon={AdjustmentsIcon}
            navtosearch={navtofilter}
          />
          <HeaderItems
            title="SEARCH"
            Icon={SearchIcon}
            navtosearch={navtosearch}
          />
          <HeaderItems
            title="WEBSITE"
            Icon={GlobeAltIcon}
            navtosearch={navtowebsite}
          />

          <HeaderItems title="RANK" Icon={FireIcon} navtosearch={navtoRank} />
        </div>
      </div>
      <div className="w-full flex relative items-center rounded-md h-10 flex-grow cursor-pointer  bg-yellow-400  hover:bg-yellow-500">
        <input
          onMouseOver={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search anything you need... (Live Search by Filter)"
          className={` font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
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
    </div>
  );
}

export default Header;
