function getPagination(page, perPage) {
  page = Math.max(Number(page) || 1, 1);
  const limit = Math.max(Number(perPage) || 1, 1);
  const skip = (page - 1) * limit;
  return { skip, limit };
}

module.exports = function paginate(page, perPage) {
  const { skip, limit } = getPagination(page, perPage);
  return [{ $skip: skip }, { $limit: limit }];
};
