const isAuthenticated = require("@/backend/middleware/isAuthenticated");
const isAdmin = require("@/backend/middleware/isAdmin");
module.exports = {
  isAuthenticated,
  isAdmin,
};
