import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  clearFilters,
  navDetail,
  selectMovie,
  updateFilter,
} from "../features/movieSlice";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";

function ResultList({
  id,
  code,
  image,
  name,
  title,
  publisher,
  keywords,
  series,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToDetails = () => {
    dispatch(
      navDetail({ id, code, image, name, title, publisher, keywords, series })
    );
    router.push(`/details/${id}`);
  };

  return (
    <>
      <Fade bottom>
        <div
          key={id}
          className="p-2 group cursor-pointer transition duration-200 z-30 ease-in transform sm:hover:scale-105 hover:z-50"
        >
          {image.map((image) => (
            <Image
              onClick={navToDetails}
              layout="responsive"
              src={image}
              height={1080}
              width={1920}
            />
          ))}
          <div className="p-2">
            <div className="flex space-x-4">
              <div>
                <h1 className="my-1">{code}</h1>
              </div>

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
              {keywords.map((keyword) => (
                <p>{keyword}</p>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default ResultList;
