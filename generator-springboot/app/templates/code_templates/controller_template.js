const ejs = require('ejs');
const controllerCode = `package com.<%=groupId%>.controllers;

        import org.springframework.web.bind.annotation.*;

        @RestController
        @RequestMapping("<%=path%>")
        public class <%=className%>Controller {

            @RequestMapping(method = RequestMethod.<%=methodName%>)
            public ResponseEntity<<%=output%>> handleRequest(@RequestBody <%=input%> input) {
                // TODO: Implement the logic for <%=path%> <%=methodName%> request
                return null;
            }
        }
      `;

function getControllerCode(groupId, controller){
    return ejs.render(controllerCode, {
        groupId: groupId,
        path: controller.path,
        classNameSmallInitials: controller.className.charAt(0).toLowerCase()+controller.className.substring(1),
        className: controller.className,
        methodName: controller.httpMethod.toUpperCase(),
        input: controller.input,
        output: controller.output 
    });
}


module.exports = {
    getControllerCode: getControllerCode
}
