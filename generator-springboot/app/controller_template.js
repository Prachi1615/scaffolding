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


module.exports = {
    controllerCode: controllerCode
}
