const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const superheroSchema = new mongoose.Schema({
    real_name: String, hero_name: String, photo_url: String, additional_info: String,});

const Superhero = mongoose.model("Superhero", superheroSchema);

const superheroes = [
    {
      real_name: "Clark Kent",
      hero_name: "Superman",
      photo_url: "https://elsumario.com/wp-content/uploads/2023/04/superman.jpg",
      additional_info: "He has super strength, flight, and heat vision.",
    },
    {
      real_name: "Bruce Wayne",
      hero_name: "Batman",
      photo_url: "https://images.hdqwalls.com/wallpapers/the-batman-4k-8c.jpg",
      additional_info: "A billionaire detective with advanced combat skills.",
    },
    {
      real_name: "Barry Allen",
      hero_name: "Flash",
      photo_url: "https://images3.alphacoders.com/928/928322.jpg",
      additional_info: "Speedster",
    },
]

// Insertar los datos en la base de datos
Superhero.insertMany(superheroes)
  .then(() => {
    console.log("✅ Superheroes seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error seeding superheroes:", err);
    mongoose.connection.close();
  });