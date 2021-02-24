const fs = require("fs");
const path = require("path");


class ControllerGenerator {
    getController = (funcName,controllerPath)=>{
        fs.appendFile(path.join(controllerPath,"controller.js"),
            controllerData(funcName,"GET"),err => {if(err) throw err});
    };
    postController =(funcName,controllerPath)=> {
        fs.appendFile(path.join(controllerPath,"controller.js"), controllerData(funcName,"POST"), err => {if (err) throw err});
    };
    putController =(funcName,controllerPath)=> {
        fs.appendFile(path.join(controllerPath,"controller.js"), controllerData(funcName,"PUT"), err => {if (err) throw err});
    };
    deleteController =(funcName,controllerPath)=> {
        fs.appendFile(path.join(controllerPath,"controller.js"), controllerData(funcName,"DELETE"), err => {if (err) throw err});
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