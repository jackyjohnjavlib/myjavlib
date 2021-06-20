import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  selectFilter,
  selectMovie,
  updateFilter,
} from "../../features/movieSlice";
import ResultList from "../../components/ResultList";
import Header from "../../components/Header";
import Head from "next/head";
import Link from "next/link";
import { getUniqueValues } from "../../utils/helpers";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Fade from "react-reveal/Fade";

function index({ collections }) {
  const dispatch = useDispatch();

  const all_movie = useSelector(selectMovie);
  const filterMovie = useSelector(selectFilter);
  const [activeKeyword, setActiveKeyword] = useState("all");
  const [activePublisher, setActivePublisher] = useState("all");
  const [activeName, setActiveName] = useState("all");
  const [lastChange, setLastChange] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [showPublisher, setShowPublisher] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);

  const publisher = all_movie ? getUniqueValues(all_movie, "publisher") : null;
  const name = all_movie ? getUniqueValues(all_movie, "name") : null;
  const keywords = all_movie ? getUniqueValues(all_movie, "keywords") : null;

  /*const filterCategory = (value, item) => {
    setShowClear(true);
    if (item === "publisher") {
      setActivePublisher(value);
      setLastChange("publisher");
    }
    if (item === "name") {
      setActiveName(value);
      //setLastChange("name");
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
    }
    if (item === "keywords") {
      setActiveKeyword(value);
      // setLastChange('colors')
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
    }

  };*/
  const filterCategory = (value, item) => {
    setShowClear(true);
    if (item === "publisher") {
      setActivePublisher(value);
      setLastChange("publisher");
    }
    if (item === "name") {
      setActiveName(value);
      //setLastChange("name");
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
    }
    if (item === "keywords") {
      setActiveKeyword(value);
      //setLastChange("colors");
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
    }
  };
  /*
  useEffect(() => {
    const items = ["publisher", "name", "keywords"];
    const hello = {
      publisher: activePublisher,
      name: activeName,
      keywords: activeKeyword,
    };
    // const items = ['category', 'company', 'colors']
    if (all_movie) {
      let filtered = all_movie;

      if (hello[lastChange] !== "all") {
        filtered = all_movie.filter(
          (movie) => movie[lastChange] === hello[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && hello[x] !== "all"
              ? filtered.filter((movie) => movie[x] === hello[x])
              : filtered;
        });
      }

      items.forEach((x) => {
        if (hello[x] !== "all") {
          filtered =
            x !== lastChange
              ? filtered.filter((movie) => movie[x] === hello[x])
              : filtered;
        }
      });
      dispatch(updateFilter(filtered));
    }
  }, [activePublisher, lastChange]);*/

  useEffect(() => {
    const items = ["publisher"];
    const hello = {
      publisher: activePublisher,
    };
    // const items = ['category', 'company', 'colors']
    if (all_movie) {
      let filtered = all_movie;

      if (hello[lastChange] !== "all") {
        filtered = all_movie.filter(
          (movie) => movie[lastChange] === hello[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && hello[x] !== "all"
              ? filtered.filter((movie) => movie[x] === hello[x])
              : filtered;
        });
      }

      items.forEach((x) => {
        if (hello[x] !== "all") {
          filtered =
            x !== lastChange
              ? filtered.filter((movie) => movie[x] === hello[x])
              : filtered;
        }
      });
      dispatch(updateFilter(filtered));
    }
  }, [activePublisher, lastChange]);

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setShowClear(false);
    setActiveKeyword("all");
    setActivePublisher("all");
    setActiveName("all");
  };

  return (
    <div className={`lg:h-screen overflow-y-auto scrollbar-hide`}>
      <Head>
        <title>Movie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header collections={all_movie} />
      <div className="max-w-screen-xl mx-auto h-10 p-10 space-x-2">
        <span className={`hover:link font-medium`}>
          <Link href="/">Home</Link>
        </span>
        <span className={`font-medium `}>/</span>
        <span className={`hover:link font-medium `}>
          <Link href="/filter">filter</Link>
        </span>
        <span className={`font-medium `}>/</span>
        <span className="text-yellow-500 font-medium uppercase"></span>
      </div>
      <main className="mx-auto max-w-screen h-full max-h-screen scrollbar-hide ">
        <div className="flex flex-col md:flex-row scrollbar-hide justify-between">
          <div className=" w-full  md:w-3/12">
            <div className="">
              <div className="flex items-center justify-center">
                <h2 className="p-4 text-center text-base md:text-lg font-medium">
                  Filter
                </h2>
                {showFilter ? (
                  <AiOutlineUp
                    onClick={() => setShowFilter(false)}
                    className="w-4 h-4 cursor-pointer"
                  />
                ) : (
                  <AiOutlineDown
                    onClick={() => setShowFilter(true)}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
              </div>

              {showClear && (
                <div className="p-4">
                  <button
                    onClick={clearAllFilters}
                    className="bg-yellow-300 hover:text-white w-full p-3 rounded-md ring-gray-200 text-sm text-gray-800 
  hover:ring-1 focus:outline-none active:ring-gray-300 hover:shadow-md"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
              {showFilter ? (
                <>
                  <Fade bottom>
                    <div className="h-screen overflow-y-scroll scrollbar-hide">
                      <div className="flex flex-col p-4 items-center space-y-2 ">
                        <div className="flex items-center">
                          <h2 className="p-4 text-center text-base md:text-lg font-medium">
                            Publisher
                          </h2>
                          {showPublisher ? (
                            <AiOutlineUp
                              onClick={() => setShowPublisher(false)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          ) : (
                            <AiOutlineDown
                              onClick={() => setShowPublisher(true)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          )}
                        </div>
                        {showPublisher ? (
                          <>
                            <div className=" space-y-4  w-full">
                              {publisher &&
                                publisher.map((value) => (
                                  <div
                                    key={value}
                                    className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                      ${
                        value == activePublisher &&
                        "bg-gray-500 text-white font-bold"
                      }`}
                                    onClick={() =>
                                      filterCategory(value, "publisher")
                                    }
                                  >
                                    <Fade bottom>{value} </Fade>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex flex-col p-4 items-center space-y-2">
                        <div className="flex items-center">
                          <h2 className="p-4 text-center text-base md:text-lg font-medium">
                            女优
                          </h2>
                          {showName ? (
                            <AiOutlineUp
                              onClick={() => setShowName(false)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          ) : (
                            <AiOutlineDown
                              onClick={() => setShowName(true)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          )}
                        </div>

                        <div className="w-full space-y-3">
                          {showName ? (
                            <>
                              {name &&
                                name.map((value) => (
                                  <div
                                    key={value}
                                    className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                      ${
                        value == activeName &&
                        "bg-gray-500 text-white font-bold"
                      }`}
                                    onClick={() =>
                                      filterCategory(value, "name")
                                    }
                                  >
                                    <Fade bottom>{value} </Fade>
                                  </div>
                                ))}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col p-4 items-center space-y-2">
                        <div className="flex items-center">
                          <h2 className="p-4 text-center text-base md:text-lg font-medium">
                            keywords
                          </h2>
                          {showKeywords ? (
                            <AiOutlineUp
                              onClick={() => setShowKeywords(false)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          ) : (
                            <AiOutlineDown
                              onClick={() => setShowKeywords(true)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          )}
                        </div>

                        <div className="w-full space-y-3">
                          {showKeywords ? (
                            <>
                              {keywords &&
                                keywords.map((value) => (
                                  <div
                                    key={value}
                                    className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                      ${
                        value == activeKeyword &&
                        "bg-gray-500 text-white font-bold"
                      }`}
                                    onClick={() =>
                                      filterCategory(value, "keywords")
                                    }
                                  >
                                    <Fade bottom>{value} </Fade>
                                  </div>
                                ))}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </Fade>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="md:w-9/12 w-full mb-5 px-5 scrollbar-hide">
            <div>
              <p className="mb-4 font-bold text-xl text-gray-500">
                {filterMovie.length} Products Fond
              </p>
            </div>
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 mx-auto h-screen overflow-y-scroll scrollbar-hide">
              {!!filterMovie?.length &&
                filterMovie.map((collection) => (
                  <ResultList
                    id={collection.id}
                    code={collection.code}
                    image={collection.image}
                    name={collection.name}
                    title={collection.title}
                    keywords={collection.keywords}
                    publisher={collection.publisher}
                    {...collection}
                    filterCategory={filterCategory}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default index;
