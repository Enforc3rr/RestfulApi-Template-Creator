const fs = require("fs");
const path = require("path");
const {getMapping,
    postMapping,
    putMapping,
    deleteMapping,
    routerJsGenerator,} = require("./RouterCodeGenerator/RouterGenerator");
const DatabaseCodeGenerator = require("./DatabaseCodeGenerator/DatabaseCodeGenerator");

const readLine = require("readline").createInterface({
    input : process.stdin ,
    output : process.stdout
});

readLine.question("Enter Project Name = ", projectName=>{

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

        const routerPath = __dirname+`/${projectName}/router`;
        const controllerPath = __dirname+`/${projectName}/controller`;


        choice(routerPath,controllerPath);
    });
});

const choice = (routerPath,controllerPath) => {
    console.log(`
Press -
1 To Add GET Method
2 To Add POST Method
3 To Add PUT Method
4 To Add DELETE Method
5 To Exit out Of Program
`);
    console.log("Enter y for yes & n for No");
    readLine.question("Do You Want A GET Method?", choice => {
        choice = Number(choice);
        switch (choice) {
            case 1:
            {
                readLine.question("Enter Name Of Get Mapping Function ", funcName => {
                    getMapping(funcName,routerPath,controllerPath);
                })
                break;
            }
            case 2:
            {
                readLine.question("Enter Name Of Post Mapping Function ", funcName => {
                    postMapping(funcName,routerPath,controllerPath);
                });
                break;
            }
            case 3:
            {
                readLine.question("Enter Name Of Put Mapping Function ", funcName => {
                    putMapping(funcName,routerPath,controllerPath);
                });
                break;
            }
            case 4:
            {
                readLine.question("Enter Name Of Delete Mapping Function ", funcName => {
                    deleteMapping(funcName,routerPath,controllerPath);
                });
                break;
            }
            default :
                console.log("Closing Out The Application")
                readLine.close();
        }
    });
}
const packageJsonContent = projName  => `
{
  "name": "${projName}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
    "dependencies": {
    "express": "^4.17.1",
    "mongoose":"5.11.18",
    "morgan":"1.10.0"
  }
}
`;

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
console.log("New Branch");