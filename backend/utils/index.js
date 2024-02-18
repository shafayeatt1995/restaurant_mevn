const jwt = require("jsonwebtoken");
const { UTApi } = require("uploadthing/server");
const stringSlug = (string) =>
  string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

const randomKey = (length = 5, stringOnly = false) => {
  if (stringOnly) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    return [...Array(length)]
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join("");
  } else {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
  }
};

const paginate = (page, perPage) => {
  page = Math.max(Number(page) || 1, 1);
  const limit = Math.max(Number(perPage) || 1, 1);
  const skip = (page - 1) * limit;

  return [{ $skip: skip }, { $limit: limit }];
};

const verifyCookieToken = async (fullToken) => {
  try {
    const token = fullToken.split(" ")[1];
    const tokenData = await jwt.verify(token, process.env.AUTH_SECRET);
    return tokenData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const utapi = new UTApi();

module.exports = {
  stringSlug,
  randomKey,
  paginate,
  utapi,
  verifyCookieToken,
};
