const { Activity, Country } = require('../../db');

// const getActivities = async (req, res) => {
//   try {
//     // Consultar todas las actividades en la base de datos
//     const activities = await Activity.findAll();

//     if (activities.length === 0) {
//       // No se encontraron actividades, devolver un mensaje
//       return res.status(200).json({ message: "No hay actividades registradas en la base de datos." });
//     }

//     // Devolver las actividades encontradas
//     res.status(200).json(activities);
//   } catch (error) {
//     // Manejar errores en caso de que la consulta falle
//     res.status(500).json({ error: "Error al obtener las actividades" });
//   }
// }

const getActivities = async (req, res) => {
  try {
    // Consultar todas las actividades en la base de datos
    const activities = await Activity.findAll({
      include: [{
        model: Country,  // Nombre del modelo asociado (asegúrate de importarlo)
        as: 'countries', // Nombre del alias que usaste en la relación en el modelo Activity
        through: { attributes: [] } // Evita que se incluyan los atributos de la tabla de unión (si tienes una tabla de unión)
      }],
    });

    if (activities.length === 0) {
      // No se encontraron actividades, devolver un mensaje
      return res.status(200).json({ message: "No hay actividades registradas en la base de datos." });
    }

    // Devolver las actividades encontradas
    res.status(200).json(activities);
  } catch (error) {
    // Manejar errores en caso de que la consulta falle
    res.status(500).json({ error: "Error al obtener las actividades" });
  }
}

module.exports = getActivities;
