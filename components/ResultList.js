import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ResultList({ id, code, image, name, title, publisher, keywords }) {
  const keyid = useState(Math.floor(Math.random(id) < 0.5));
  return (
    <>
      <Link href={`/details/${id}`}>
        <div
          key={keyid}
          className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
        >
          {image.map((image) => (
            <Image layout="responsive" src={image} height={1080} width={1920} />
          ))}
          <div className="p-2">
            <div className="flex space-x-4">
              <h1 className="my-1">{code}</h1>
              <div className="space-x-4  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                {name.map((name) => (
                  <div>
                    <h1 className="">{name}</h1>
                  </div>
                ))}
              </div>
            </div>
            <h2 className=" line-clamp-1 mt-1 text-xl text-white transition-all duration-100 ease-in group-hover:font-bold ">
              {title}
            </h2>

            <div className="my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
              <p>{publisher}</p>
              {keywords.map((keyword) => (
                <p>{keyword}</p>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ResultList;
