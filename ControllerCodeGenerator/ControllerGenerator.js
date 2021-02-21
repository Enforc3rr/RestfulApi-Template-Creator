const fs = require("fs");


class ControllerGenerator {
    constructor(pathOfController) {
        this.pathOfController = pathOfController;
    }
    getController =(funcName)=>{
        fs.writeFile(this.pathOfController,controllerData(funcName,"GET"),err => {if(err) throw err});
    };
    postController =(funcName)=> {
        fs.writeFile(this.pathOfController, controllerData(funcName,"POST"), err => {if (err) throw err});
    };
    putController =(funcName)=> {
        fs.writeFile(this.pathOfController, controllerData(funcName,"PUT"), err => {if (err) throw err});
    };
    deleteController =(funcName)=> {
        fs.writeFile(this.pathOfController, controllerData(funcName,"DELETE"), err => {if (err) throw err});
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