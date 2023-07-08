const YAML = require('js-yaml');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');
const ISO_8859_1 = 'ISO-8859-1'; 
const UTF_8 = 'utf-8';



//getControllers();


//---------------------------------------------utilityFuntions---------------------------------------------------------

function getControllers(yamlPath) {
    const yamlData = getYaml(yamlPath);
    const paths = getPaths(yamlData);
    for (const cur of Object.entries(paths)) {
        var ret = [];
        const path = cur[0];
        for (const [key, value] of Object.entries(cur[1])) {
            const httpMethod = key;
            const { input, output } = getDetails(value);
            const className = getClassName(yamlData, httpMethod);
            //console.log(httpMethod+" "+input+" "+output);
            const curController = { className, httpMethod, input, output, path };
            ret.push(curController);
        }
        //console.log(ret); //uncomment this line to see the return array type
        return ret;
    }
}

function getPaths(yamlData) {
    return yamlData.paths;
}

function getClassNameFirstPart(yamlData) {
    const tags = yamlData.tags;
    return tags[0].name;
}

function getYaml(path) {
    console.log("path:"+ path);
    const encoding = getEncoding(path);
    console.log("Encoding:"+ encoding);
    let yamlFile = fs.readFileSync(path, 'utf-8');
    const yamlData = YAML.load(yamlFile);
    return yamlData;
}

function getEncoding(path){
    let yamlFile = fs.readFileSync(path);
    let ret = detectCharacterEncoding(yamlFile).encoding;
    if (ret == ISO_8859_1){
        return UTF_8;
    }
    return ret;
}

function getDetails(details) {
    const input = getInput(details.requestBody);
    const output = getOutput(details.responses);
    return { input, output }
}

function getInput(request) {
    const requestObject = request.content['application/json'].schema.properties;
    const strs = Object.values(requestObject);
    const str = strs[0];
    const ref = str['$ref'];
    const arr = ref.split("/");
    const aLen = Object.values(arr).length;
    return arr[aLen - 1];//str.charAt(0).toUpperCase()+str.substring(1);
}

function getOutput(responses) {
    const responsesObject = responses['200'].content['application/json'].schema.properties;
    const strs = Object.values(responsesObject);
    const str = strs[0];
    const ref = str['$ref'];
    const arr = ref.split('/');
    const aLen = Object.values(arr).length;
    return arr[aLen - 1];
}

function getClassName(yamlData, httpMethod) {
    const httpMethodMap = getHttpMethodMap();
    return getClassNameFirstPart(yamlData) + httpMethodMap.get(httpMethod);
}

function getHttpMethodMap() {
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

module.exports = {
    getControllers: getControllers
};