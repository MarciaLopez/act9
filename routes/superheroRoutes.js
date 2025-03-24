const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Superhero = require("../models/Superhero");
const path = require("path");

// Render Add Superhero Page
router.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/add.html"));
});

// Render Edit Superhero Page
router.get("/edit/:id", async (req, res) => {
    try {
        const superhero = await Superhero.findById(req.params.id);
        if (!superhero) return res.status(404).json({ message: "Superhero not found" });

        res.sendFile(path.join(__dirname, "../public/edit.html"));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API Routes
router.get("/", async (req, res) => {
    try {
        const superheroes = await Superhero.find();
        res.json(superheroes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { real_name, hero_name, photo_url, additional_info } = req.body;

        if (!real_name || !hero_name || !photo_url || !additional_info) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newHero = new Superhero({ real_name, hero_name, photo_url, additional_info });
        await newHero.save();
        res.status(201).json({ message: "Superhero added!", hero: newHero });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedSuperhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSuperhero) return res.status(404).json({ message: "Superhero not found" });
        res.json(updatedSuperhero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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