import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { navDetail } from "../features/movieSlice";
import Fade from "react-reveal/Fade";

function SearchList({ id, code, image, name, title, publisher, keywords }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToDetails = () => {
    dispatch(navDetail({ id, code, image, name, title, publisher, keywords }));
    router.push(`/details/${id}`);
  };
  return (
    <>
      <Fade bottom>
        <div
          onClick={navToDetails}
          className="p-2 flex items-center space-x-4 hover:bg-gray-800 text-black hover:text-white rounded-3xl"
        >
          <div>
            {image.map((image) => (
              <Image
                layout="fixed"
                src={image}
                height="160"
                width="160"
                className=" object-contain"
              />
            ))}
          </div>
          <h1 className="">{code}</h1>
          <div className="flex space-x-4">
            {name.map((name) => (
              <div>
                <h1 className="">{name}</h1>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </>
  );
}

export default SearchList;
