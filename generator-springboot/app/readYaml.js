const YAML = require('js-yaml');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');
const path = require('path');
const { apiCode } = require('./templates/code_templates/apiTemplate');

const fileBuffer = fs.readFileSync('./templates/CUFXPartyAssociationDataModelAndServices.yaml');
const charsetMatch = detectCharacterEncoding(fileBuffer);


let yamlFile = fs.readFileSync("./templates/CUFXPartyAssociationDataModelAndServices.yaml", charsetMatch.encoding);

// Parse the YAML content
const yamlData = YAML.load(yamlFile);

const tags = yamlData.tags;
const classNameFirstPart = tags[0].name;

const paths = yamlData.paths;
getControllers(paths);


//---------------------------------------------utilityFuntions---------------------------------------------------------

function getControllers(paths){

    for(const path of Object.entries(paths)){
        //console.log(path[0]);
        const pth = path[0];
        //console.log("---------");
        for (const [key, value] of Object.entries(path[1])){
            console.log("key "+ key);
            console.log("value "+ value);
        }
    }
}

//function getDetails(details){
//    const httpMethod = "";
//    for (const [key, value] of Object.entries(details)){
//        const httpMethod = key;
//        const input
//    }
//    const input = "";
//    const output = "";
//    //console.log(details);
//    return {httpMethod, input, output};
//}

function getMethod(details){
    for (const key of Object.entries(details)){
        console.log("Entry "+key);
    }
}

function getClassName(httpMethod){
    const httpMethodMap = getHttpMethodMap();
    return classNameFirstPart+httpMethodMap.get(httpMethod);
}

function getHttpMethodMap(){
    const ret = new Map();
    ret.set("post", "Post");
    ret.set("get", "Get");
    ret.set("delete", "Delete");
    ret.set("put", "Put");
    return ret;
}
// Extract service names and APIs from the YAML data
//const path = Object.keys(yamlData.paths);

// console.log(ab);