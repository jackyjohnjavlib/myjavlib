import RankActress from "./RankActress";
import ResultList from "./ResultList";

function RankingResult({ collections, actress, newBie, royal }) {
  console.log("actress", actress);
  return (
    <div>
      <div>
        <h1 className="text-center text-2xl lg:text-4xl font-medium">
          The Top 5 Movies (June19 - July19)
        </h1>
        <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <ResultList
              id={collection.id}
              code={collection.code}
              image={collection.image}
              name={collection.name}
              title={collection.title}
              keywords={collection.keywords}
              publisher={collection.publisher}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-center text-2xl lg:text-4xl font-medium">
          The Top 5 Actress (June19 - July19)
        </h1>
        <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3">
          {actress.map((actress) => (
            <RankActress
              id={actress.id}
              name={actress.name}
              image={actress.image}
              keywords={actress.keywords}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-center text-2xl lg:text-4xl font-medium">
          The Top 5 Newbie (June19 - July19)
        </h1>
        <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3">
          {newBie.map((actress) => (
            <RankActress
              id={actress.id}
              name={actress.name}
              image={actress.image}
              keywords={actress.keywords}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-center text-2xl lg:text-4xl font-medium">
          The Top 5 Royal
        </h1>
        <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3">
          {royal.map((collection) => (
            <ResultList
              id={collection.id}
              code={collection.code}
              image={collection.image}
              name={collection.name}
              title={collection.title}
              keywords={collection.keywords}
              publisher={collection.publisher}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RankingResult;
