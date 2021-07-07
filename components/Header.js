import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchList from "./SearchList";
import HeaderItems from "./HeaderItems";
import {
  AdjustmentsIcon,
  FireIcon,
  GlobeAltIcon,
  HomeIcon,
  SearchIcon,
  GiftIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie } from "../features/movieSlice";
import {
  resetGrid,
  toggleGrid2,
  toggleGrid3,
  toggleGrid5,
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
} from "../features/gridSlice";

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
  const dispatch = useDispatch();
  const [phase, setPhase] = useState("reset");
  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);
  const all_movie = useSelector(selectMovie);
  const dataList = all_movie;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const excludeColumns = ["id", "color"];

  const toggrid2 = () => {
    if (phase === "reset") {
      setPhase("phase3");
      dispatch(toggleGrid3(true));
    }
    if (phase === "phase3") {
      setPhase("phase2");
      dispatch(toggleGrid2(true));
    }
    if (phase === "phase2") {
      setPhase("phase5");
      dispatch(toggleGrid5(true));
    }
    if (phase === "phase5") {
      setPhase("reset");
      dispatch(resetGrid());
    }
  };

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
          <div onClick={toggrid2} className="hidden lg:flex cursor-pointer">
            <HeaderItems
              title={`${
                (initial && `Grid`) ||
                (grid2 && "Grid2") ||
                (grid3 && "Grid3") ||
                (grid5 && "Grid5")
              }`}
              Icon={ViewGridIcon}
              selectGrid
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
