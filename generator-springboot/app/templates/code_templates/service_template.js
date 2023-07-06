const ejs = require('ejs');
const serviceCode = `
        package com.<%=groupId%>.services;

        import org.springframework.web.bind.annotation.*;
        import org.springframework.stereotype.Service;

        @Service("<%=classNameSmallInitials%>Service")
        public class <%=className%>Service {

            public <%=output%> process(<%=input%> input) {
                // TODO: Implement the logic 
                return null;
            }
        }
      `;

function getServiceCode(groupId, controller){
    return ejs.render(serviceCode, {
        groupId: groupId,
        path: controller.path,
        classNameSmallInitials: controller.className.charAt(0).toLowerCase()+controller.className.substring(1),
        className: controller.className,
        methodName: controller.httpMethod,
        input: controller.input,
        output: controller.output 
    });
}      
module.exports= {
    getServiceCode:getServiceCode
}