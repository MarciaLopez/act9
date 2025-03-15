const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Superhero = require("../models/Superhero");

// @route   GET /api/superheroes
// @desc    Get all superheroes
router.get("/", async (req, res) => {
  try {
    const superheroes = await Superhero.find();
    res.json(superheroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/superheroes/:id
// @desc    Get a superhero by ID
router.get("/:id", async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) return res.status(404).json({ message: "Superhero not found" });
    res.json(superhero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/superheroes
// @desc    Create a new superhero
router.post("/", async (req, res) => {
  try {
    const { real_name, hero_name, photo_url, additional_info } = req.body;

      if (!real_name || !hero_name || !photo_url || !additional_info) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const newHero = new Superhero({ real_name, hero_name, photo_url, additional_info });
      await newHero.save();

      res.status(201).json({ message: "Superhero added!", hero: newHero });
  } catch (error) {
      console.error("Error saving to DB:", error);
      res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/superheroes/:id
// @desc    Update a superhero
router.put("/:id", async (req, res) => {
  try {
    const updatedSuperhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSuperhero) return res.status(404).json({ message: "Superhero not found" });
    res.json(updatedSuperhero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/superheroes/:id
// @desc    Delete a superhero
router.delete("/:id", async (req, res) => {
  try {
    const deletedSuperhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!deletedSuperhero) return res.status(404).json({ message: "Superhero not found" });
    res.json({ message: "Superhero deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
