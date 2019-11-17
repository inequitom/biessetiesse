const fs = require("fs");

const tiessesArray = fs.readdirSync("./public/tiesses");

const writeStream = fs.createWriteStream("./data/tiesses.json");
writeStream.write(JSON.stringify(tiessesArray));
writeStream.close();
