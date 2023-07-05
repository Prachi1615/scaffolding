const controllerCodeWithBody = `
        package com.yourcompany.yourproject.controller;

        import org.springframework.web.bind.annotation.*;

        @RestController
        @RequestMapping("${path}")
        public class ${controllerClassName} {

            @RequestMapping(method = RequestMethod.${methodName})
            public ResponseEntity<?> handle${methodName}Request(@RequestBody ${contollerInputType} input) {
                // TODO: Implement the logic for ${path} ${methodName} request
                return null;
            }
        }
      `;

module.exports= {
    controllerCodeWithBody:controllerCodeWithBody
}