const { Gradle } = require('gradle');

// Create the Gradle object
const gradle = new Gradle();

// Configure the build file
gradle.buildscript((script) => {
  script.repositories((repositories) => {
    repositories.mavenCentral();
  });
  script.dependencies((dependencies) => {
    dependencies.classpath('org.springframework.boot:spring-boot-gradle-plugin:2.5.2');
  });
});
gradle.plugins((plugins) => {
  plugins.apply('java');
  plugins.apply('org.springframework.boot');
});
gradle.group = 'com.example';
gradle.version = '0.0.1-SNAPSHOT';
gradle.sourceCompatibility = '11';

// Add dependencies
gradle.dependencies((dependencies) => {
  dependencies.implementation('org.springframework.boot:spring-boot-starter-web:2.5.2');
  // Add other dependencies here
});

// Generate the build.gradle file content
const buildGradleContent = gradle.toString();

// Write the file to the destination
this.fs.write(this.destinationPath(`${serviceName}/build.gradle`), buildGradleContent);
