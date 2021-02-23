const fs = require("fs");
const path = require("path");


class ControllerGenerator {
    getController = (funcName)=>{
        console.log(__dirname);
        fs.appendFile(path.join("controller.js"),
            controllerData(funcName,"GET"),err => {if(err) throw err});
    };
    postController =(funcName)=> {
        fs.appendFile(path.join(__dirname,"controller.js"), controllerData(funcName,"POST"), err => {if (err) throw err});
    };
    putController =(funcName)=> {
        fs.appendFile(path.join(__dirname,"controller.js"), controllerData(funcName,"PUT"), err => {if (err) throw err});
    };
    deleteController =(funcName)=> {
        fs.appendFile(path.join(__dirname,"controller.js"), controllerData(funcName,"DELETE"), err => {if (err) throw err});
    };
}
const controllerData = (funcName,methodName) =>`
/*
@desc  What End Point Does Goes Here.
@route ${methodName} /
*/
exports.${funcName} = async (req , res , next) =>{
    try{

    }catch (e) {

    }
    next();
}
`;

module.exports = ControllerGenerator;