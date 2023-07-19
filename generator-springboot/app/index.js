"use strict";
const Generator = require("yeoman-generator");
const fs = require('fs');
const ejs = require('ejs');
const { getControllers } = require("./readYaml");
const { getMainCode } = require('./templates/code_templates/main_application_code');
const { getApiCode } = require('./templates/code_templates/api_template');
const { getControllerCode } = require('./templates/code_templates/controller_template');
const { getServiceCode } = require('./templates/code_templates/service_template');
const { getDtoCode } = require('./templates/code_templates/dto_template');


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
                message: 'Enter the Group ID:',
                default: 'finx.cufx',
            },
            {
                type: 'input',
                name: 'version',
                message: 'Enter the project version:',
                default: '1.0-SNAPSHOT',
            },
            {
                type: 'input',
                name: 'yamlFiles',
                message: 'Enter yaml file name',
                default: 'aplication',
            },
            {
                type: 'input',
                name: 'springBootVersion',
                message: 'Enter springboot version',
                default: '2.7.12',
            },
            {
                type: 'list',
                name: 'buildTool',
                message: 'Select the build tool:',
                choices: ['Gradle', 'Maven'],
                default: 'Maven',
            }
        ];

        return this.prompt(prompts).then(answers => {
            this.serviceName = answers.serviceName;
            this.groupId = answers.groupId;
            this.version = answers.version;
            this.yamlFiles = answers.yamlFiles;
            this.springBootVersion = answers.springBootVersion;
            this.buildTool = answers.buildTool;
        });
    }



    writing() {
        if (this.buildTool === 'Gradle') {
            const gradleTemplatePath = this.templatePath('build_file_templates/gradle-builder.gradle');
            const gradleBuildContent = ejs.render(fs.readFileSync(gradleTemplatePath, 'utf-8'), {
                groupId: this.groupId,
                version: this.version,
                springBootVersion: this.springBootVersion
            });
            this.fs.write(this.destinationPath('output/' + this.serviceName + '/build.gradle'), gradleBuildContent);
            this.fs.write(this.destinationPath('output/' + this.serviceName + '/settings.gradle'), "rootProject.name = " + this.serviceName);



        } else if (this.buildTool === 'Maven') {
            const mavenTemplatePath = this.templatePath('build_file_templates/maven-builder.xml');
            const mavenBuildContent = ejs.render(fs.readFileSync(mavenTemplatePath, 'utf-8'), {
                groupId: this.groupId,
                serviceName: this.serviceName,
                version: this.version,
                springBootVersion: this.springBootVersion
            });
            this.fs.write(this.destinationPath('output/' + this.serviceName + '/pom.xml'), mavenBuildContent);
        }

        this.fs.copy(
            this.templatePath("src"),
            this.destinationPath('output/' + this.serviceName + "/src")
        );

        this.fs.copy(
            this.templatePath('yaml_files/' + this.yamlFiles + '.yaml'),
            this.destinationPath('output/' + this.serviceName + '/src/main/resources/openApi.yaml')
        );

        this.fs.copy(
            this.templatePath('code_templates/' + 'dockerfile'),
            this.destinationPath('output/' + this.serviceName + '/dockerfile')
        );

        this.fs.copy(
            this.templatePath('code_templates/' + '/.gitignore'),
            this.destinationPath('output/' + this.serviceName + '/.gitignore')
        );
        // this.fs.write(this.destinationPath('output/' + this.serviceName + '/.gitignore'), "");


        const mainCode = getMainCode(this.groupId, this.serviceName);
        const mainCodeName = this.serviceName + 'Application';
        this.fs.write(
            this.destinationPath('output/' + this.serviceName + '/src/main/java/com/finx/cufx/' + mainCodeName + ".java"),
            mainCode
        );

        const yamlPath = 'app/templates/yaml_files/' + this.yamlFiles + '.yaml';
        const controllers = getControllers(yamlPath);
        for (const controller of controllers) {
            const controllerCode = getControllerCode(this.groupId, controller);
            const controllerName = controller.className + 'Controller.java';
            this.fs.write(
                this.destinationPath('output/' + this.serviceName + '/src/main/java/com/finx/cufx/controllers/' + controllerName),
                controllerCode);
        }

        for (const controller of controllers) {
            const dtoCode = getDtoCode(this.groupId, controller);
            const dtoName = controller.className + 'Dto.java';
            this.fs.write(
                this.destinationPath('output/' + this.serviceName + '/src/main/java/com/finx/cufx/dto/' + dtoName),
                dtoCode);
        }


        for (const controller of controllers) {
            const apiCode = getApiCode(this.groupId, controller);
            const apiName = controller.className + 'Api.java';
            this.fs.write(
                this.destinationPath('output/' + this.serviceName + '/src/main/java/com/finx/cufx/apis/' + apiName),
                apiCode);
        }
        for (const controller of controllers) {
            const serviceCode = getServiceCode(this.groupId, controller);
            const serviceName = controller.className + 'Service.java';
            this.fs.write(
                this.destinationPath('output/' + this.serviceName + '/src/main/java/com/finx/cufx/services/' + serviceName),
                serviceCode);
        }

    }

    end() {
        this.log(`Application ${this.serviceName} generated successfully`);
    }
};




