const JobSeeker = require('../models/JobSeekerModel');

exports.create = async (req, res) => {
  try {
    const result = await JobSeeker.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating Job Seeker:", error);
    res.status(500).json({ message: "Error creating Job Seeker" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const results = await JobSeeker.findAll();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching Job Seekers:", error);
    res.status(500).json({ message: "Error fetching Job Seekers" });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await JobSeeker.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching Job Seeker:", error);
    res.status(500).json({ message: "Error fetching Job Seeker" });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await JobSeeker.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating Job Seeker:", error);
    res.status(500).json({ message: "Error updating Job Seeker" });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await JobSeeker.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting Job Seeker:", error);
    res.status(500).json({ message: "Error deleting Job Seeker" });
  }
};
