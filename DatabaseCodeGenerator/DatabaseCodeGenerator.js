const fs = require("fs");
const path = require("path");

const databaseConfig = (databaseConfigPath)=>{
    fs.appendFile(path.join(databaseConfigPath,"databaseConfig.js"),databaseData,err => {if(err) throw err});
    fs.appendFile(path.join(databaseConfigPath,"model.js"),modelCode,err => {if(err) throw err});
}
const modelCode = `
const mongoose = require("mongoose");

const modelName = new mongoose.Schema({

});

module.exports = mongoose.model("model",modelName);`;

const databaseData = `
const mongoose = require("mongoose");

const database = async ()=>{
    const conn = await mongoose.connect(process.env.DB,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    console.log("connected to database");
}
module.exports = database;
`;

module.exports = databaseConfig;