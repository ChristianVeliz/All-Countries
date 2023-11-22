const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const importData = require("./src/routes/controllers/importData");
const PORT = 3001;




conn.sync({ force: true }).then(async() => {
  await importData();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
