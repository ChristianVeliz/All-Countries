const {Country} = require('../../db') 



const getAllCountries = async(req,res) => {
    try {

        const countriesDB = await Country.findAll();
        
        const result = countriesDB.map((country) =>({
            id: country.id,
            image:country.image,
            name:country.name,
            continent:country.continent,
            population: country.population
        }))
        console.log('tamaño de array',result.length);
      
       
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: "Error al obtener los países"})
    }
}


module.exports = getAllCountries