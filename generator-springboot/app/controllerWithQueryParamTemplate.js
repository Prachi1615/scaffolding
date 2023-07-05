const controllerCodeWithQueryParam = `
        package com.${packageName}.controller;

        import org.springframework.web.bind.annotation.*;
        import org.springframework.http.ResponseEntity;

        @RestController
        @RequestMapping("${path}")
        public class ${controllerClassName} {

            @RequestMapping(method = RequestMethod.${methodName})
            public ResponseEntity<?> handle${methodName}Request(@RequestParam("${controllerParam}) ${contollerInputType} input) {
                // TODO: Implement the logic for ${path} ${methodName} request
                return null;
            }
        }
      `;

module.exports= {
    controllerCodeWithQueryParam:controllerCodeWithQueryParam
}