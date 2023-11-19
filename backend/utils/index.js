const stringSlug = (string) =>
  string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

const randomKey = (number) =>
  [...Array(number)].map(() => Math.random().toString(36)[2]).join("");

module.exports = { stringSlug, randomKey };
