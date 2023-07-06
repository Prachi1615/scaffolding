const serviceCode = `
        package com.<%=packageName%>.services;

        import org.springframework.web.bind.annotation.*;
        import org.springframework.stereotype.Service;

        @Service("<%=serviceClassName%>")
        public class <%=serviceClassName%> {

            //Returning null for generic implementation. Please return the appropriate output
            public <%=outputType%> <%=methodName%>(<%=inputType%> input) {
                // TODO: Implement the logic for <%=path%> <%=methodName%> request
                return null;
            }
        }
      `;

module.exports= {
    serviceCode:serviceCode
}