const { Country } = require('../../db');
const { Op } = require('sequelize'); // Importar el operador de Sequelize para búsquedas

const getCountryByName = async (req, res) => {
  try {
    let nameCountry = req.query.name;

    if (!nameCountry) {
      return res.status(400).json({ error: "El parámetro 'name' es requerido en el query" });
    }

    // Convertir la primera letra a mayúscula y el resto a minúsculas
    nameCountry = nameCountry.charAt(0).toUpperCase() + nameCountry.slice(1).toLowerCase();

    // Realizar una búsqueda en la base de datos para encontrar coincidencias parciales
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${nameCountry}%` // % indica que puede haber texto antes o después
        }
      }
    });

    if (countries.length === 0) {
      return res.status(404).json({ error: "No se encontraron países con el nombre proporcionado" });
    }

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los países por nombre" });
  }
}

module.exports = getCountryByName;

