const Generator = require('yeoman-generator');
const YAML = require('yaml');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');

const fileBuffer = fs.readFileSync('app/templates/CUFXPartyAssociationDataModelAndServices.yaml');
const charsetMatch = detectCharacterEncoding(fileBuffer);


let yamlFile = fs.readFileSync("app/templates/CUFXPartyAssociationDataModelAndServices.yaml", charsetMatch.encoding);

module.exports = class extends Generator {
  writing() {
    // Parse the YAML content
  const yamlData = YAML.load(yamlFile);

  // Extract service names and APIs from the YAML data
  //const path = Object.keys(yamlData.paths);

  let data = yamlData.paths['/PartyAssociationMessage'];
  for (const [key, value] of Object.entries(data)) {
      console.log(key);
  }
    // Read the YAML file
    // const yamlContent = fs.readFileSync(
    //   this.templatePath('templates/application.yml'),
    //   'utf-8'
    // );


    // Generate the controller code for each API
    Object.entries(yamlData.paths).forEach(([path, pathData]) => {
      const controllerClassName = generateControllerClassName(path);
      const methodName = generateMethodName(pathData);

      // Generate the controller code based on the API data
      const controllerCode = `
        package com.yourcompany.yourproject.controller;

        import org.springframework.web.bind.annotation.*;

        @RestController
        @RequestMapping("${path}")
        public class ${controllerClassName} {

            @RequestMapping(method = RequestMethod.${methodName})
            public String handle${methodName}Request() {
                // TODO: Implement the logic for ${path} ${methodName} request
                return "${path} ${methodName} method";
            }
        }
      `;

      // Write the generated controller code to the destination file
      this.fs.write(
        this.destinationPath(
          `src/main/java/com/yourcompany/yourproject/controller/${controllerClassName}.java`
        ),
        controllerCode
      );
    });
  }
};

// Function to generate the controller class name based on the API path
function generateControllerClassName(path) {
  const parts = path.split('/').filter((part) => part !== '');
  const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return `${capitalizedParts.join('')}Controller`;
}

// Function to generate the HTTP method name based on the API data
function generateMethodName(pathData) {
  const methods = Object.keys(pathData);
  return methods.length > 0 ? methods[0].toUpperCase() : 'GET';
}