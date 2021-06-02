import db from "../config/firebase";
import moment from "moment";

const addfile = (e) => {
  e.preventDefault();
  const id = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");

  db.collection("collection").doc(id).set({
    code: "",
    image: [],
    keywords: [],
    name: [],
    publisher: "",
    title: "",
  });
};
function Header() {
  return (
    <div className="flex items-center p-4 space-x-10 shadow-lg">
      <div>
        <h1>My JavLib</h1>
      </div>
      <div className=" flex-grow">
        <input placeholder="Search Something" className="w-full outline-none" />
      </div>
      <div className="flex space-x-6 outline-none">
        <button className="w-full outline-none hover:bg-gray-500 p-4 rounded-2xl">
          Filter
        </button>
        <button
          className="w-full outline-none    hover:bg-gray-500 p-4 rounded-2xl"
          onClick={addfile}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Header;
