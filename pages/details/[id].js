import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { selectDetail } from "../../features/movieSlice";

function Details() {
  const movies = useSelector(selectDetail);
  return (
    <div>
      <Head>
        <title>Movie | {movies.code}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-screen">
        <div className="max-w-screen-xl mx-auto mt-5 ">
          <div className="pt-4">
            <div className="grid place-items-center">
              {movies.image.map((image) => (
                <Image
                  className={
                    "w-full rounded-lg cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                  }
                  width={700}
                  height={500}
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
                  {movies.name.map((name) => (
                    <h1 className="text-xl">{name}</h1>
                  ))}
                </div>
                <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                  {movies.keywords.map((keywords) => (
                    <p className="text-lg italic">{keywords}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;
