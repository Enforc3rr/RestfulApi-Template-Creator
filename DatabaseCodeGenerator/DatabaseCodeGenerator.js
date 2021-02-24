const fs = require("fs");
const path = require("path");

const databaseConfig = (databaseConfigPath)=>{
    fs.writeFile(path.join(databaseConfigPath,"/databaseConfig"),databaseData,err => {if(err) throw err});
}

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