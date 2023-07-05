const controllerCodeWithQueryParam = `
        package com.yourcompany.yourproject.controller;

        import org.springframework.web.bind.annotation.*;

        @RestController
        @RequestMapping("${path}")
        public class ${controllerClassName} {

            @RequestMapping(method = RequestMethod.${methodName})
            public String handle${methodName}Request(@RequestParam ${contollerInputType} input) {
                // TODO: Implement the logic for ${path} ${methodName} request
                return null;
            }
        }
      `;

module.exports= {
    controllerCodeWithQueryParam:controllerCodeWithQueryParam
}