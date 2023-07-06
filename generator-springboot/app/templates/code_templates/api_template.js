const ejs = require('ejs');
const apiCode = `
        package com.<%=groupId%>.apis;
        import org.springframework.stereotype.Service;

        @Service("<%=classNameSmallInitials%>Api")
        public class <%=className%>Api {
    
        
            public <%=output%> execute(<%=input%> input){
                // TODO: Implement the logic here.
                return null;
            }
      `;

function getApiCode(groupId, controller){
    return ejs.render(apiCode, {
        groupId: groupId,
        classNameSmallInitials: controller.className.charAt(0).toLowerCase()+controller.className.substring(1),
        className: controller.className,
        input: controller.input,
        output: controller.output 
    });
}

module.exports= {
    getApiCode:getApiCode
}