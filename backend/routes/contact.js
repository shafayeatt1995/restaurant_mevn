const express = require("express");
const router = express.Router();

const { createMessage } = require("@/backend/controllers/ContactController");
const { contactVal } = require("@/backend/validation/contact");
const { validationHandler } = require("@/backend/validation/validationHandler");

router.post("/", contactVal, validationHandler, createMessage);

module.exports = router;
