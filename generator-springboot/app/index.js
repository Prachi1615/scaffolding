"use strict";
const Generator = require("yeoman-generator");
const YAML = require('js-yaml');
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');

const fileBuffer = fs.readFileSync('app/templates/CUFXPartyAssociationDataModelAndServices.yaml');
const charsetMatch = detectCharacterEncoding(fileBuffer);
const controllerCodeWithBody = require('./controllerWithBodyTemplate');
const controllerCodeWithQueryParam = require('./controllerWithQueryParamTemplate');
const serviceCode = require('./serviceTemplate');
const apiCode = require('./apiTemplate');

import {ApiProperties} from './models/ApiProperties';
import {ControllerProperties} from './models/ControllerProperties';
import {ServcieProperties} from './models/ServiceProperties';

// const gradleContent = require('./build_file_templates/gradle-builder')
// const mavenContent = require('./build_file_templates/maven-builder');

let yamlFile = fs.readFileSync("app/templates/CUFXPartyAssociationDataModelAndServices.yaml", charsetMatch.encoding);
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    prompting() {
        const prompts = [
            {
                type: 'input',
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
            this.serviceName = answers.serviceName;
            this.groupId = answers.groupId;
            this.version = answers.version;
            this.buildTool = answers.buildTool;
        });
    }



    writing() {
        if (this.buildTool === 'Gradle') {
            const gradleTemplatePath = this.templatePath('build_files_templates/gradle-builder.gradle');
            const gradleBuildContent = ejs.render(fs.readFileSync(gradleTemplatePath, 'utf-8'), {
                groupId,
                version,
                springBootVersion,
            });
            this.fs.write(this.destinationPath('build.gradle'), gradleBuildContent);
        } else if (this.buildTool === 'Maven') {
            const mavenTemplatePath = this.templatePath('templates/mavenBuildTemplate.xml');
            const mavenBuildContent = ejs.render(fs.readFileSync(mavenTemplatePath, 'utf-8'), {
                groupId,
                artifactId: serviceName,
                version,
                springBootVersion,
            });
            this.fs.write(this.destinationPath('pom.xml'), mavenBuildContent);
        }



        // Parse the YAML content
        const yamlData = YAML.load(yamlFile);


        // Extract service names and APIs from the YAML data
        let data = yamlData.paths['/PartyAssociationMessage'];
        for (const [key, value] of Object.entries(data)) {
            console.log(key);
        }
        //const service = Object.keys(yamlData.tags['name']);
        // Generate the controller code for each service
        // paths.forEach((path) => {
        //     const controllerClassName = `${path}Controller`;
        //     const apiData = yamlData.paths[path];

        //     // Generate the controller code based on the API data
        //     const controllerCode = `
        //       package com.finx.cufx.${service};

        //       import org.springframework.web.bind.annotation.*;

        //       @RestController
        //       @RequestMapping("/api/${path}")
        //       public class ${controllerClassName} {

        //           ${generateApiMethods(apiData)}
        //       }
        //     `;

        //     // Write the generated controller code to the destination file
        //     this.fs.write(
        //         this.destinationPath(
        //             `src/main/java/com/finx/cufx/controller/${controllerClassName}.java`
        //         ),
        //         controllerCode
        //     );
        // });

        this.fs.copy(
            this.templatePath("src"),
            this.destinationPath(this.serviceName + "/src")
        );

        this.fs.copy(
            this.templatePath('CUFXPartyAssociationDataModelAndServices.yaml'),
            this.destinationPath(this.serviceName + '/src/main/resources/application.yml')
        );





    }

    end() {
        this.log(`Application ${this.serviceName} generated successfully`);
    }
};

function generateApiMethods(apiData) {
    let apiMethods = '';

    // Loop through each HTTP method in the API data
    Object.entries(apiData).forEach(([httpMethod, methodData]) => {
        const methodName = Object.keys(methodData)[0];
        const path = methodData[methodName].operationId;

        // Generate the method code
        apiMethods += `
        @${httpMethod}("${path}")
        public String ${methodName}() {
            // method logic
            return " ${methodName} method";
        }
      `;
    });

    return apiMethods;
}


function _generateGradleBuildFile(serviceName, groupId, version) {
    // Generate the Gradle build file content
    const gradleBuildContent = `
      plugins {
          id 'org.springframework.boot' version '2.5.2'
          id 'io.spring.dependency-management' version '1.0.11.RELEASE'
          id 'java'
      }

      group '${groupId}'
      version '${version}'
      
      repositories {
          mavenCentral()
      }
      
      dependencies {
          implementation 'org.springframework.boot:spring-boot-starter-web'
          // Add other dependencies as needed
      }
      
      test {
          useJUnitPlatform()
      }
    `;

    // Write the file to the destination
    this.fs.write(this.destinationPath('build.gradle'), gradleBuildContent);
}

