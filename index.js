const fs = require("fs");
const path = require("path");
const {getMapping} = require("./HttpMethodGenerator/Mappings");

const readLine = require("readline").createInterface({
    input : process.stdin ,
    output : process.stdout
});
readLine.question("Enter Project Name = ", projectName=>{
    fs.mkdir(path.join(__dirname,projectName),{},err => {
        if(err) console.log(`Some Error Occured While Creating Project(${projectName})`);
        fs.mkdir(path.join(__dirname+`/${projectName}`,"/router"),err1 => {if(err1) throw err1});
        fs.writeFile(path.join(__dirname+`/${projectName}/router`,"router.js"),"",err1 => {if(err1) throw err1});
        fs.mkdir(path.join(__dirname+`/${projectName}`,"/controller"),err1 => {if(err1) throw err1});
        fs.appendFile(path.join(__dirname,projectName,"package.json"),packageJsonContent(projectName),err1 =>{if(err1) throw err1});
        console.log(`Project ${projectName} created`);

        const routerPath = __dirname+`/${projectName}/router`;
        console.log(routerPath);
        choice(routerPath);
    });
});



const choice = (routerPath) => {
    readLine.question("Enter Your Choice\n", choice => {
        choice = Number(choice);
        switch (choice) {
            case 1:
            {
                readLine.question("Enter Name Of Get Mapping Function ", funcName => {
                    getMapping(funcName,routerPath);
                })
                break;
            }
            case 2:
            {
                readLine.question("Enter Name Of Post Mapping Function ", funcName => {
                    getMapping(funcName,routerPath);
                })
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
  "name": ${projName},
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
  }
}
`






