const fs = require("fs");
const path = require("path");
const ControllerGenerator = require("../ControllerCodeGenerator/ControllerGenerator");
const controlGen = new ControllerGenerator();

exports.routerJsGenerator = (funcName,folderName) => {
    fs.writeFile(path.join(folderName,"router.js"),routerData(funcName,folderName),
        err => {if(err) throw err});
};
exports.getMapping = (funcName,folderName)=>{
    fs.appendFile(path.join(folderName,"router.js"),getMappingData(funcName),
        err => {if(err) throw err});
    controlGen.getController(funcName);
    console.log(`GET Mapping Method With Function ${funcName} Created`);
};
exports.postMapping = (funcName,folderName)=>{
    fs.appendFile(path.join(folderName,"router.js"),postMappingData(funcName),
        err => {if(err) throw err});
    controlGen.postController(funcName);
    console.log(`POST Mapping Method With Function ${funcName} Created`);
};
exports.putMapping = (funcName,folderName)=>{
    fs.appendFile(path.join(folderName,"router.js"),putMappingData(funcName),
        err => {if(err) throw err});
    controlGen.putController(funcName);
    console.log(`PUT Mapping Method With Function ${funcName} Created`);
};
exports.deleteMapping = (funcName,folderName)=>{
    fs.appendFile(path.join(folderName,"router.js"),deleteMappingData(funcName),
        err => {if(err) throw err});
    controlGen.deleteController(funcName);
    console.log(`DELETE Mapping Method With Function ${funcName} Created`);
};
const routerData =(funName,folderName) => `
const express = require("express");
const router = express.Router();
const {${funName},} = require("./controller/controller");
`;
const getMappingData = (funcName)=>`
//Using Express Router And Calling Corresponding Function
router.route("/")
    .get(${funcName});
`;
const postMappingData = (funcName)=>`
router.route("/")
    .post(${funcName});
`;
const putMappingData = (funcName)=>`
router.route("/")
    .put(${funcName});
`;
const deleteMappingData = (funcName)=>`
router.route("/")
    .delete(${funcName});
`;

