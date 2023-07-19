const ejs = require('ejs');
const apiCode = `package com.<%=groupId%>.apis;
        import org.springframework.stereotype.Service;

        @Service("<%=classNameSmallInitials%>Api")
        public class <%=className%>Api {
    
        
            public <%=output%> execute(<%=input%> input){
                // TODO: Implement the logic here.
                String response="<%=response%>";
                return response;
            }
        }    
      `;

function getApiCode(groupId, controller){
    return ejs.render(apiCode, {
        groupId: groupId,
        classNameSmallInitials: controller.className.charAt(0).toLowerCase()+controller.className.substring(1),
        className: controller.className,
        input: controller.input,
        output: controller.output ,
        response: controller.resBody
    });
}

module.exports= {
    getApiCode:getApiCode
}