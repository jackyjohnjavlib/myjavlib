import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { navDetail } from "../features/movieSlice";

function BannerItem({
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
    <div key={code} className="relative group" onClick={navToDetails}>
      <Image
        src={image[0]}
        layout="responsive"
        height={720}
        width={1080}
        className="object-contain "
      />
      <h1 className="absolute left-96 bottom-10 text-5xl opacity-0 group-hover:opacity-100 text-white tracking-widest font-light">
        {code}
      </h1>
    </div>
  );
}

export default BannerItem;
