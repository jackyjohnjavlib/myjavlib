import ResultList from "./ResultList";
import { useSelector } from "react-redux";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
} from "../features/gridSlice";

function Result({ collections }) {
  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);

  return (
    <div
      className={`px-5 my-10 grid grid-flow-row-dense 
      ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
      ${grid2 && "md:grid-cols-2"}    
      ${grid3 && "md:grid-cols-3"}
      ${grid5 && "md:grid-cols-5"}
         
      `}
    >
      {collections.map((collection) => (
        <ResultList
          id={collection.id}
          code={collection.code}
          image={collection.image}
          name={collection.name}
          title={collection.title}
          keywords={collection.keywords}
          publisher={collection.publisher}
          series={collection.series}
        />
      ))}
    </div>
  );
}

export default Result;
