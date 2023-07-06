const controllerCode = `
        package com.<%=packageName%>.controller;

        import org.springframework.web.bind.annotation.*;

        @RestController
        @RequestMapping("<%=path%>")
        public class <%=controllerClassName%> {

            @RequestMapping(method = RequestMethod.<%=httpMethodName%>)
            public ResponseEntity<<%=outputType%>> handle<%=methodName%>Request(@RequestBody <%=inputType%> input) {
                // TODO: Implement the logic for <%=path%> <%=methodName%> request
                return null;
            }
        }
      `;


module.exports = {
    controllerCode: controllerCode
}
