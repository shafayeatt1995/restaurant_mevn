const isAuthenticated = require("@/backend/middleware/isAuthenticated");
const isAdmin = require("@/backend/middleware/isAdmin");
const isOwner = require("@/backend/middleware/isOwner");

module.exports = { isAuthenticated, isAdmin, isOwner };
