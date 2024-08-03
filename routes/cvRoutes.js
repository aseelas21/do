const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cvController");

console.log("Setting up CV routes");

router.post("/", (req, res) => {
  console.log("POST /cvs");
  cvController.createCV(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /cvs");
  cvController.getAllCVs(req, res);
});

router.get("/:id", (req, res) => {
  console.log("GET /cvs/:id");
  cvController.getCV(req, res);
});

router.put("/:job_seeker_id", (req, res) => {
  console.log("PUT /cvs/:id");
  cvController.updateCV(req, res);
});

router.delete("/:job_seeker_id", (req, res) => {
  console.log("DELETE /cvs/:id");
  cvController.deleteCV(req, res);
});

module.exports = router;
