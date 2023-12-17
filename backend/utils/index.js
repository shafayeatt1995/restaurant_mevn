const stringSlug = (string) =>
  string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

const randomKey = (number = 5) =>
  [...Array(number)].map(() => Math.random().toString(36)[2]).join("");

function getPagination(page, perPage) {}

const paginate = (page, perPage) => {
  page = Math.max(Number(page) || 1, 1);
  const limit = Math.max(Number(perPage) || 1, 1);
  const skip = (page - 1) * limit;

  return [{ $skip: skip }, { $limit: limit }];
};

module.exports = { stringSlug, randomKey, paginate };
