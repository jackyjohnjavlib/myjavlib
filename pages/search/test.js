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

function Details() {
  const dispatch = useDispatch();
  const movies = useSelector(selectDetail);
  const all_movie = useSelector(selectMovie);
  const filterMovie = useSelector(selectFilter);
  const [activeName, setActiveName] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("all");
  const [activeSeries, setActiveSeries] = useState("");
  const [lastChange, setLastChange] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState(movies.name[0]);
  const [showSuggest, setShowSuggest] = useState(true);

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
      const filtered =
        value !== "all"
          ? all_movie.filter((movie) => movie[item].includes(value))
          : all_movie;
      dispatch(updateFilter(filtered));
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
                    <h1 className="text-2xl">{movies.title}</h1>
                    <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                      <h1 className="">{movies.code}</h1>
                      {movies.series && (
                        <div
                          onClick={() =>
                            filterCategory(movies.series, "series")
                          }
                          className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                          ${
                            activeSeries && "bg-gray-500 text-white font-bold"
                          }`}
                        >
                          <h1 className="cursor-pointer">{movies.series}</h1>
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
                            onClick={() => filterCategory(value, "name")}
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
                            onClick={() => filterCategory(value, "keywords")}
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
              <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 ">
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
