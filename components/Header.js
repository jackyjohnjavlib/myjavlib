import { useRouter } from "next/router";
import { useState } from "react";
import SearchList from "./SearchList";
import HeaderItems from "./HeaderItems";
import {
  AdjustmentsIcon,
  FireIcon,
  GlobeAltIcon,
  HomeIcon,
  SearchIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectMovie } from "../features/movieSlice";

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

function Header() {
  const all_movie = useSelector(selectMovie);
  const dataList = all_movie;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const excludeColumns = ["id", "color"];

  const handleChange = (value) => {
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    const Value = value.toLocaleUpperCase().trim();
    if (Value === "") setSearchResults(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLocaleUpperCase().includes(Value)
        );
      });
      setSearchResults(filteredData);
    }
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
    router.push("/actress");
  };

  const navtoRandom = () => {
    router.push("/random");
  };
  const navtomobileRandom = () => {
    router.push("/mobilerandom");
  };

  return (
    <div className="flex flex-col items-center sticky top-0 z-50 shadow-lg h-auto m-5">
      <div className="flex items-center space-x-6">
        <div className="flex flex-grow justify-evenly max-w-2xl mt-4">
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
          <HeaderItems
            title="ACTRESS"
            Icon={FireIcon}
            navtosearch={navtoRank}
          />
          <div className="flex lg:hidden">
            <HeaderItems
              title="Random"
              Icon={GiftIcon}
              navtosearch={navtomobileRandom}
            />
          </div>
          <div className="hidden lg:flex">
            <HeaderItems
              title="Random"
              Icon={GiftIcon}
              navtosearch={navtoRandom}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex relative items-center rounded-md h-10 flex-grow cursor-pointer  bg-yellow-400  hover:bg-yellow-500">
        <input
          onMouseOver={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
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
            className="absolute w-full bg-white bottom-0 z-50  scrollbar-hide"
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
                  series={collection.series}
                />
              ))
            ) : (
              <>
                {searchTerm && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    No Movies found
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
