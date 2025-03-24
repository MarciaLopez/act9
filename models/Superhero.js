const mongoose = require("mongoose");

const SuperheroSchema = new mongoose.Schema({
  real_name: { type: String, required: true },
  hero_name: { type: String, required: true },
  photo_url: { type: String, required: true },
  additional_info: { type: String },
});

module.exports = mongoose.model("Superhero", SuperheroSchema);
