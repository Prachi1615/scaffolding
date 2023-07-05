"use strict";
const Generator = require("yeoman-generator");
const YAML = require('js-yaml');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');

const fileBuffer = fs.readFileSync('app/templates/CUFXPartyAssociationDataModelAndServices.yaml');
const charsetMatch = detectCharacterEncoding(fileBuffer);
//const mavenBuildTool = require('./build_file_templates/maven-builder');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  prompting() {
    const prompts = [
      {
        type: "string",
        name: "serviceName",
        message: "What is the application name?",
        default: "myservice"
      },
      {
        type: 'input',
        name: 'groupId',
        message: 'Enter the Maven Group ID:',
        default: 'com.example',
      },
      {
        type: 'input',
        name: 'version',
        message: 'Enter the project version:',
        default: '1.0-SNAPSHOT',
      },
      {
        type: 'list',
        name: 'buildTool',
        message: 'Select the build tool:',
        choices: ['Gradle', 'Maven'],
        default: 'Gradle',
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.appName = answers.serviceName;
      this.groupId = answers.groupId;
      this.version = answers.version;
      this.buildTool = answers.buildTool;
    });
  }
}