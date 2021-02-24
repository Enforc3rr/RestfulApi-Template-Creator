const fs = require("fs");
const path = require("path");
const {getMapping,
    postMapping,
    putMapping,
    deleteMapping,
    routerJsGenerator,} = require("./RouterCodeGenerator/RouterGenerator");

const readLine = require("readline").createInterface({
    input : process.stdin ,
    output : process.stdout
});
readLine.question("Enter Project Name = ", projectName=>{

    fs.mkdir(path.join(__dirname,projectName),{},err => {

        if(err) console.log(`Some Error Occurred While Creating Project(${projectName})`);

        fs.writeFile(path.join(__dirname+`/${projectName}`,"index.js"),"",err1 =>{if(err1) throw err1});

        fs.mkdir(path.join(__dirname+`/${projectName}`,"/router"),err1 => {if(err1) throw err1});

        fs.writeFile(path.join(__dirname+`/${projectName}/router`,"router.js"),"",err1 => {if(err1) throw err1});

        fs.mkdir(path.join(__dirname+`/${projectName}`,"/controller"),err1 => {if(err1) throw err1});

        routerJsGenerator(projectName,__dirname+`/${projectName}/router`);


        fs.appendFile(path.join(__dirname,projectName,"package.json"),
            packageJsonContent(projectName),err1 =>{if(err1) throw err1});

        console.log(`Project ${projectName} created`);

        const routerPath = __dirname+`/${projectName}/router`;
        const controllerPath = __dirname+`/${projectName}/controller`;


        choice(routerPath,controllerPath);
    });
});

const choice = (routerPath,controllerPath) => {
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
                    postMapping(funcName,routerPath);
                });
                break;
            }
            case 3:
            {
                readLine.question("Enter Name Of Put Mapping Function ", funcName => {
                    putMapping(funcName,routerPath);
                });
                break;
            }
            case 4:
            {
                readLine.question("Enter Name Of Delete Mapping Function ", funcName => {
                    deleteMapping(funcName,routerPath);
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
    "morgan":"1.10.0"
  }
}
`;

const indexJsData = `
const Morgan = require("morgan");
const Express = require("express");
const router = require("./router/router.js);
const app = new Express();

app.use(morgan);
app.use(router);
const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=> console.log("server started at PORT");
`;