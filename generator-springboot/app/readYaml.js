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
//console.log(classNameFirstPart);

//path of paths is array with 0 as path and 1 is obj, obj
//httpMehod of path is array with 0 as httpMehod;
//{req, res} of httpMethod wi

const paths = yamlData.paths;
getControllers(paths);


//---------------------------------------------utilityFuntions---------------------------------------------------------

function getControllers(paths){
    
}

//fucntion getController(curPath){

//}


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