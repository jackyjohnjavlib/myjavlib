import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderItems from "../../components/HeaderItems";
import ResultList from "../../components/ResultList";
import javlibData from "../../config/javlibData.json";
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

function index() {
  const dataList = javlibData;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(dataList);
  const excludeColumns = ["id", "color"];

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

  {
    /**
     * 
     * 
     * const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    setSearchResults(
      javlibData.filter((collection) =>
        collection.code.includes(searchTerm.toLocaleUpperCase())
      )
    );
  };
     * 
     const handleSearchPublisher = (e) => {
    setSearchTerm(e.target.value);

    setSearchResults(
      javlibData.filter((collection) =>
        collection.publisher.includes(searchTerm.toLocaleUpperCase())
      )
    );
  };

  const handleSearchActress = (e) => {
    setSearchTerm(e.target.value);

    setSearchResults(
      javlibData.filter((collection) => collection.name.includes(searchTerm))
    );
  };

  const handleSearchKeywords = (e) => {
    setSearchTerm(e.target.value);

    setSearchResults(
      javlibData.filter((collection) =>
        collection.keywords.includes(searchTerm.toString())
      )
    );
  };
   useEffect(() => {
    if (searchCode === true) {
      setSearchResults(
        javlibData.filter((collection) =>
          collection.code.includes(searchTerm.toLocaleUpperCase())
        )
      );
    }
    if (searchPublisher === true) {
      setSearchResults(
        javlibData.filter((collection) =>
          collection.publisher.includes(searchTerm.toLocaleUpperCase())
        )
      );
    }
    if (searchActress === true) {
      setSearchResults(
        javlibData.filter((collection) =>
          collection.name.toLocaleString().includes(searchTerm.toLocaleString())
        )
      );
    }
    if (searchKeywords === true) {
      setSearchResults(
        javlibData.filter((collection) =>
          collection.keywords
            .toLocaleString()
            .includes(searchTerm.toLocaleString())
        )
      );
    }
  }, [
    searchTerm,
    searchKeywords,
    searchActress,
    searchPublisher,
    searchCode,
    javlibData,
  ]); */
  }

  return (
    <div>
      <Head>
        <title>My JavLib</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center sticky top-0 z-50 h-auto m-5">
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

        <div className="w-full">
          <input
            className={` font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
           `}
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search by Actress"
          />
        </div>
      </div>

      <main className="mx-auto max-w-screen">
        <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.map((collection) => (
            <ResultList
              id={collection.id}
              code={collection.code}
              image={collection.image}
              name={collection.name}
              title={collection.title}
              keywords={collection.keywords}
              publisher={collection.publisher}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default index;
