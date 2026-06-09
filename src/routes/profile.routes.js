const express = require("express");
const {
  analyzeProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

router.post("/analyze", analyzeProfile);

module.exports = router;