import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { navDetail } from "../features/movieSlice";
import Fade from "react-reveal/Fade";

function RankActress({ id, name, image, keywords }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <Fade bottom>
        <div className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Image
            layout="responsive"
            src={image}
            height={1920}
            width={1080}
            className=" object-contain"
          />
          <div className="p-2 -mt-20 z-50">
            <h1 className="text-lg text-center">{name}</h1>
          </div>
          <div className="my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
            {keywords.map((keyword) => (
              <p>{keyword}</p>
            ))}
          </div>
        </div>
      </Fade>
    </>
  );
}

export default RankActress;
