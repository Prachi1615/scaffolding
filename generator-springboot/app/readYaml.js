const YAML = require('js-yaml');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');

const fileBuffer = fs.readFileSync('app/templates/CUFXPartyAssociationDataModelAndServices.yaml');
const charsetMatch = detectCharacterEncoding(fileBuffer);


let yamlFile = fs.readFileSync("app/templates/CUFXPartyAssociationDataModelAndServices.yaml", charsetMatch.encoding);

// Parse the YAML content
const yamlData = YAML.load(yamlFile);

// Extract service names and APIs from the YAML data
//const path = Object.keys(yamlData.paths);

let data = yamlData.paths['/PartyAssociationMessage'];
for (const [key, value] of Object.entries(data)) {
    console.log(key);
}

// console.log(ab);