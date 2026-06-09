const express = require("express");
const {
  analyzeProfile,
  getProfiles,
  getProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

router.post("/analyze", analyzeProfile);

router.get("/", getProfiles);

router.get("/:username", getProfile);

router.delete("/:username", deleteProfile);

module.exports = router;
