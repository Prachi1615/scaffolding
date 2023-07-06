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
        var ret = [];
        const pth = path[0];
        for (const [key, value] of Object.entries(path[1])){
            const httpMethod = key;
            const {input, output} = getDetails(value);
            const className = getClassName(httpMethod);
            //console.log(httpMethod+" "+input+" "+output);
            const curController = {className, httpMethod, input, output, pth};
            ret.push(curController);
        }
        console.log(ret);
    }
}

function getDetails(details){
   const input = getInput(details.requestBody);
   const output = getOutput(details.responses);
   return {input, output}
}

function getInput(request){
    const requestObject = request.content['application/json'].schema.properties;
    const strs = Object.keys(requestObject);
    const str = strs[0];
    return str.charAt(0).toUpperCase()+str.substring(1);
}

function getOutput(responses){
    const responsesObject = responses['200'].content['application/json'].schema.properties;
    const strs = Object.keys(responsesObject);
    const str = strs[0];
    return str.charAt(0).toUpperCase()+str.substring(1);
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