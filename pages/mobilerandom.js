import Header from "../components/Header";
import Head from "next/head";
import javlibData from "../config/javlibData.json";
import MobileBanner from "../components/MobileBanner";

function mobilerandom({ movies }) {
  return (
    <div>
      <Head>
        <title>My JavLib || Random</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header collections={movies} />
      <MobileBanner />
    </div>
  );
}

export default mobilerandom;

export async function getServerSideProps(context) {
  const ref = javlibData;

  const movieRes = await ref;

  return {
    props: {
      movies: movieRes,
    },
  };
}
