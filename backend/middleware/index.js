const isAuthenticated = require("@/backend/middleware/isAuthenticated");
const isAdmin = require("@/backend/middleware/isAdmin");
const isManager = require("@/backend/middleware/isManager");
const isAuthOrGuest = require("@/backend/middleware/isAuthOrGuest");

module.exports = { isAuthenticated, isAdmin, isManager, isAuthOrGuest };
