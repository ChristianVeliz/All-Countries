const { Activity } = require('../../db');

const postActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    if (!name || difficulty === undefined || !season || !countries || countries.length === 0) {
      return res.status(400).json({ error: "Todos los campos son requeridos, y debes relacionar la actividad con al menos un país." });
    }

    // Crear la actividad en la base de datos
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Relacionar la actividad con los países indicados
    await newActivity.addCountries(countries);

    res.status(201).json({ message: "Actividad turística creada exitosamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la actividad turística" });
  }
}

module.exports = postActivity;



   // countries.forEach(element => {
      //     await CountryActivity.create({
      //         countryId: element,
      //         activityId: newActivity.id
      //     })
      // });