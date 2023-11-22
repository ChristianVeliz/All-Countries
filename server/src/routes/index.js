const { Router } = require("express");
const getAllCountries = require('./controllers/getAllCountries');
const getCountryById =  require('./controllers/getCountryById');
const getCountryByName = require('./controllers/getCountryByName');
const getActivities = require("./controllers/getActivities");
const postActivity = require("./controllers/postActivity");

const router = Router();

router.get('/countries',(req,res) =>{
    console.log("req", req)

    getAllCountries(req,res)
})

router.get('/countries/name',(req,res) => {
    getCountryByName(req,res)
})

router.get('/countries/:idPais',(req,res) => {
    getCountryById(req,res)
})

router.get('/activities',(req,res) => {
    getActivities(req,res)
})

router.post('/activities',(req,res)=>{
    postActivity(req,res)
})




module.exports = router;
