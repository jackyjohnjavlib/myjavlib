import Head from "next/head";
import Image from "next/image";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Result from "../components/Result";
import db from "../config/firebase";

export default function Home({ collections }) {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {collections.length}
      <main className="mx-auto max-w-screen">
        <Result collections={collections} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const ref = db.collection("collection");

  const collectionRes = await ref.get();
  const collections = collectionRes.docs.map((collection) => ({
    id: collection.id,
    ...collection.data(),
  }));

  return {
    props: {
      collections: collections,
    },
  };
}
