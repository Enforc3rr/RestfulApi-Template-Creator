const fs = require("fs");
const path = require("path");

exports.getMapping = (funcName,folderName)=>{
    fs.appendFile(path.join(folderName,"router.js"),routerData(funcName,folderName),
            err => {if(err) throw err});
    console.log(`Get Mapping Method With Function ${funcName} Created`);
}

const routerData =(funName,folderName) => `
const express = require("express");
const router = express.Router();
const {${funName}} = require("${folderName}/controller/urlcontroller");


//Using Express Router And Calling Corresponding Function
router.route("/")
    .get(${funName});
`;