const isAuthenticated = require("@/backend/middleware/isAuthenticated");
const isAdmin = require("@/backend/middleware/isAdmin");
const isManager = require("@/backend/middleware/isManager");

module.exports = { isAuthenticated, isAdmin, isManager };
