const fs = require("fs");
const path = require("path");
const dependency = require("./PackageJsonCode/JsonDependency");
const {
    getMapping,
    postMapping,
    putMapping,
    deleteMapping,
    routerJsGenerator} = require("./RouterCodeGenerator/RouterGenerator");
const DatabaseCodeGenerator = require("./DatabaseCodeGenerator/DatabaseCodeGenerator");
const inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type : "input",
            message : "Write Name Of Your Project : ",
            name : "projectName"
        },
        {
            type : "input",
            message : "Enter Name Of GET Mapping Function :",
            name : "getFunc"
        },
        {
            type : "input",
            message : "Enter Name Of POST Mapping Function :",
            name : "postFunc"
        },
        {
            type : "input",
            message : "Enter Name Of PUT Mapping Function :",
            name : "putFunc"
        },
        {
            type : "input",
            message : "Enter Name Of DELETE Mapping Function :",
            name : "delFunc"
        },
        {
            type : "input",
            message: "Enter The Name Of Dependency Which You Want To Add :",
            name : "depAdd1"
        }
    ])
    .then(answers => {
        const {projectName,getFunc,postFunc,putFunc,delFunc,depAdd1,depAdd2,depAdd3} = answers;
        project(projectName);
        setTimeout(()=>{
            const routerPath = __dirname+`/${projectName}/router`;
            const controllerPath = __dirname+`/${projectName}/controller`;
            getMethodFunc(getFunc,routerPath,controllerPath);
            postMethodFunc(postFunc,routerPath,controllerPath);
            putMethodFunc(putFunc,routerPath,controllerPath);
            delMethodFunc(delFunc,routerPath,controllerPath);
        },1000);
        const data = async () =>{
            const depData = await dependency(depAdd1);
            const {packageVersion,actualPackageName} = depData;
            fs.appendFile(path.join(__dirname,projectName,"package.json"),
                dependencyAddition(actualPackageName,packageVersion),err1 =>{if(err1) throw err1});
        };
        data()
            .then(()=>{
                console.log(`${depAdd1} has been added`)
            })
            .catch(()=>{
                console.log(`${depAdd1} was not found`);
                process.exit();
            });
    })
    .catch(()=>console.log("Error Occurred"));

const project = projectName=>{

    fs.mkdir(path.join(__dirname,projectName),{},err => {

        if(err) console.log(`Some Error Occurred While Creating Project(${projectName})`);

        fs.writeFile(path.join(__dirname+`/${projectName}`,"index.js"),indexJsData,err1 =>{if(err1) throw err1});

        fs.mkdir(path.join(__dirname+`/${projectName}`,"/router"),err1 => {if(err1) throw err1});
        fs.writeFile(path.join(__dirname+`/${projectName}/router`,"router.js"),"",err1 => {if(err1) throw err1});
        routerJsGenerator(projectName,__dirname+`/${projectName}/router`);

        fs.mkdir(path.join(__dirname+`/${projectName}`,"/controller"),err1 => {if(err1) throw err1});

        fs.mkdir(path.join(__dirname+`/${projectName}`,"/database"),err1 => {if(err1) throw err1});
        fs.writeFile(path.join(__dirname+`/${projectName}`,".env"),"",err1=>{if(err1) throw  err1});
        DatabaseCodeGenerator(__dirname+`/${projectName}/database`);

        fs.appendFile(path.join(__dirname,projectName,"package.json"),
            packageJsonContent(projectName),err1 =>{if(err1) throw err1});
        console.log(`Project ${projectName} created`);
    });
};
const getMethodFunc = (funcName,routerPath,controllerPath) => {
    getMapping(funcName, routerPath, controllerPath);
}
const postMethodFunc = (funcName,routerPath,controllerPath) => {
    postMapping(funcName, routerPath, controllerPath);
};
const putMethodFunc = (funcName,routerPath,controllerPath) => {
    putMapping(funcName, routerPath, controllerPath);
};
const delMethodFunc = (funcName,routerPath,controllerPath) => {
    deleteMapping(funcName, routerPath, controllerPath);
};

const dependencyAddition = (depName , depVersion)=>`
    "${depName}":"${depVersion}",
      }
    }
`;

const packageJsonContent = (projName)=>`
{
  "name": "${projName}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.10",
    "morgan": "^1.10.0",
    "mongoose" : "^5.11.18"
`

const indexJsData = `
const Morgan = require("morgan");
const Express = require("express");
const databaseConfig = require("./database");
const router = require("./router/router.js);
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});

const app = new Express();
databaseConfig();

app.use(morgan);
app.use(router);
const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=> console.log("server started at PORT");
`;


