const axios = require("axios");
const {Country} = require('../../db')

const ENDPOINT = 'http://localhost:5000/countries'
const importData = async(req,res) => {
    try {
        // Verifica si ya existen datos en la base de datos antes de importar
        const existingData = await Country.findAll();
        if (existingData.length === 0) {
          // Realiza una petición a la API externa para obtener los datos
          const response = await axios.get(ENDPOINT); 
    
          // Guarda los datos en la base de datos
          const countriesData = response.data; // Asumiendo que la respuesta contiene datos de países

          const result = countriesData.map((country) =>({
            id:country.cca3,
            name:country.name.common,
            image:country.flags.svg,
            continent: country.continents[0],
            capital: !country.capital ? '' : country.capital[0],
            subregion:country.subregion,
            area:country.area,
            population:country.population,

        }))
          await Country.bulkCreate(result);
    
          console.log("Datos importados exitosamente");
        } else {
          console.log("Los datos ya existen en la base de datos, no se importarán nuevamente.");
        }
      } catch (error) {
        console.error("Error al importar datos:", error);
      }
}




module.exports = importData