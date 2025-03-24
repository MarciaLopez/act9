// Nota: Este archivo está pensado para ser ejecutado con herramientas de migración como migrate-mongo
module.exports = {
    async up(db, client) {
      // Crear la colección "superheroes" con un validador de esquema
      await db.createCollection("superheroes", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["real_name", "hero_name", "photo_url"],
            properties: {
              real_name: { bsonType: "string" },
              hero_name: { bsonType: "string" },
              photo_url: { bsonType: "string" }, // Almacena la URL de la imagen
              additional_info: { bsonType: "string" }
            }
          }
        }
      });
    },
  
    async down(db, client) {
      // Eliminar la colección en caso de rollback
      await db.collection("superheroes").drop();
    }
  };
  