import ResultList from "./ResultList";

function Result({ collections }) {
  return (
    <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
}

export default Result;
