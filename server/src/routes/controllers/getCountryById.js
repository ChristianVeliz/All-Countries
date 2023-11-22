const { Country, Activity } = require('../../db');

const getCountryById = async (req, res) => {
  const countryId = req.params.idPais; // Supongamos que el ID del país se pasa como parámetro en la URL
 const upperId = countryId.toUpperCase();
  try {
    const country = await Country.findByPk(upperId);
    if (!country) {
      return res.status(404).json({ error: 'País no encontrado' });
    }

    const activities = await country.getActivities();

    const result = {
      dataCountry: country,
      activities: activities,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el país y sus actividades' });
  }
};

module.exports = getCountryById;













// const { Country } = require('../../db');

// const getCountryById = async (req, res) => {
//     try {
//         const paramsId = req.params.idPais;
//         const idGlobal = paramsId.toUpperCase();
        
//         const country = await Country.findOne({ where: { id: idGlobal } });

//         if (country) {
            
//             const result = {
//                 dataCountry: country,
//                 activities: ''
//             }
//             res.status(200).json(country);
//         } else {
//             res.status(404).json({ error: "País no encontrado" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener el país" });
//     }
// }

module.exports = getCountryById;
