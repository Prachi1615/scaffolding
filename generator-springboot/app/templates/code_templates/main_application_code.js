const ejs = require('ejs');
const mainApplicationCode = `package com.<%=groupId%>.<%=applicationNameSmall%>;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.context.annotation.Bean;

    @SpringBootApplication
    public class <%=applicationName%>Application {

    	public static void main(String[] args) {
    		SpringApplication.run(TableExtractorApplication.class, args);
    	}

    }
    `;

function getMainCode(groupId, applicationName){
    return ejs.render(mainApplicationCode,{
        groupId: groupId,
        applicationName: applicationName,
        applicationNameSmall: applicationName.toLowerCase()
    });
}    

module.exports = {
    getMainCode: getMainCode
}