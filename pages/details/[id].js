import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  selectDetail,
  selectFilter,
  selectMovie,
  findSuggest,
  selectSuggest,
  updateFilter,
} from "../../features/movieSlice";
import javlibData from "../../config/javlibData.json";
import ResultList from "../../components/ResultList";
import { useState, useEffect } from "react";
import { getUniqueValues } from "../../utils/helpers";
import SuggestList from "../../components/SuggestList";
import Zoom from "react-reveal/Zoom";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
  resetGrid,
} from "../../features/gridSlice";

function Details() {
  const dispatch = useDispatch();
  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);
  const movies = useSelector(selectDetail);
  const all_movie = useSelector(selectMovie);
  const dataList = all_movie;
  const filterMovie = useSelector(selectFilter);
  const [activeName, setActiveName] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("all");
  const [activeSeries, setActiveSeries] = useState("");
  const [lastChange, setLastChange] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState(movies.name[0]);
  const [showSuggest, setShowSuggest] = useState(true);
  const excludeColumns = ["id", "title"];

  useEffect(() => {
    dispatch(resetGrid());
  }, []);
  const [select, setSelect] = useState(false);

  const getUniqueName = () => {
    let unique = movies.name.map((name) => name);

    unique = unique.flat();

    return [...new Set(unique)];
  };

  const getUniqueKeywords = () => {
    let unique = movies.keywords.map((name) => name);
    unique = unique.flat();

    return [...new Set(unique)];
  };

  const name = all_movie ? getUniqueName() : null;

  const keywords = all_movie ? getUniqueKeywords() : null;

  const filterCategory = (value, item) => {
    setShowSuggest(false);
    if (item === "publisher") {
      setActivePublisher(value);
      setLastChange("publisher");
    }
    if (item === "series") {
      setActiveSeries(value);
      setActiveKeyword("");
      setActiveName("");
    }
    if (item === "name") {
      setActiveName(value);
      setActiveKeyword("");
      setActiveSeries("");
      //setLastChange("name");
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
    }
    if (item === "keywords") {
      setActiveName("");
      setActiveKeyword(value);
      setActiveSeries("");
      //setLastChange("colors");
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
    }
  };

  useEffect(() => {
    setSearchResults(
      javlibData.filter((collection) =>
        collection.name.includes(movies.name[0])
      )
    );
    setActiveKeyword("");
    setActiveName("");
    setActiveSeries("");
    setShowSuggest(true);
  }, [javlibData, movies.name[0]]);

  useEffect(() => {
    const items = ["series"];
    const hello = {
      series: activeSeries,
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
  }, [activeSeries, lastChange]);

  const filterData = (value, item) => {
    if (item === "series") {
      setActiveSeries(value);
      setActiveName("");
      setActiveKeyword("");
    }
    if (item === "name") {
      setActiveName(value);
      setActiveKeyword("");
      setActiveSeries("");
    }
    if (item === "keywords") {
      setActiveKeyword(value);
      setActiveName("");
      setActiveSeries("");
    }
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

  return (
    <>
      <Zoom bottom>
        <div>
          <Head>
            <title>
              Movie || {movies.name[0]} || {movies.code}
            </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <main className="mx-auto max-w-screen">
            <div className="max-w-screen-xl mx-auto mt-5 ">
              <div className="pt-4">
                <div className="grid place-items-center p-4">
                  {movies.image.map((image) => (
                    <Image
                      className={
                        "w-full rounded-lg cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                      }
                      width={1080}
                      height={720}
                      objectFit="cover"
                      src={image}
                      alt=""
                    />
                  ))}
                </div>
                <div>
                  <div className=" grid place-items-center  mb-10 w-full">
                    <div className="p-4">
                      <h1 className="text-lg lg:text-2xl">{movies.title}</h1>
                    </div>

                    <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                      <h1 className="">{movies.code}</h1>
                      {movies.series && (
                        <div
                          onClick={() => filterData(movies.series, "series")}
                          className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                          ${
                            activeSeries && "bg-gray-500 text-white font-bold"
                          }`}
                        >
                          <h1 className="cursor-pointer line-clamp-1 lg:line-clamp-none">
                            {movies.series}
                          </h1>
                        </div>
                      )}
                      {name &&
                        name.map((value) => (
                          <div
                            key={value}
                            className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                    ${
                      value == activeName && "bg-gray-500 text-white font-bold"
                    }`}
                            onClick={() => filterData(value, "name")}
                          >
                            {value}
                          </div>
                        ))}
                    </div>
                    <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                      {keywords &&
                        keywords.map((value) => (
                          <div
                            key={value}
                            className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                    ${
                      value == activeKeyword &&
                      "bg-gray-500 text-white font-bold"
                    }`}
                            onClick={() => filterData(value, "keywords")}
                          >
                            {value}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className=" text-center text-2xl lg:text-4xl font-medium">
                Suggest Movie
              </h1>
              <div
                className={`px-5 my-10 grid grid-flow-row-dense 
      ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
      ${grid2 && "md:grid-cols-2"}    
      ${grid3 && "md:grid-cols-3"}
      ${grid5 && "md:grid-cols-5"}
         
      `}
              >
                {showSuggest && searchResults ? (
                  <>
                    {searchResults.map((collection) => (
                      <SuggestList
                        id={collection.id}
                        code={collection.code}
                        image={collection.image}
                        name={collection.name}
                        title={collection.title}
                        keywords={collection.keywords}
                        publisher={collection.publisher}
                        resultCode={movies.code}
                        series={collection.series}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {!showSuggest &&
                      !!filterMovie?.length &&
                      filterMovie.map((collection) => (
                        <SuggestList
                          id={collection.id}
                          code={collection.code}
                          image={collection.image}
                          name={collection.name}
                          title={collection.title}
                          keywords={collection.keywords}
                          publisher={collection.publisher}
                          resultCode={movies.code}
                          series={collection.series}
                        />
                      ))}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </Zoom>
    </>
  );
}

export default Details;
