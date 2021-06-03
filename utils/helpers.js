export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === "name") {
    unique = unique.flat();
  }

  if (type === "keywords") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};
