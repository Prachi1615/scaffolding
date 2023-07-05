const serviceCode = `
        package com.yourcompany.yourproject.services;

        import org.springframework.web.bind.annotation.*;
        import org.springframework.stereotype.Service;

        @Service("${serviceClassNameLowerInitials}")
        public class ${serviceClassName} {

            //Returning null for generic implementation. Please return the appropriate output
            public ${serviceOutputType} ${serviceMethodName}(${serviceInputType} input) {
                // TODO: Implement the logic for ${path} ${methodName} request
                return null;
            }
        }
      `;

module.exports= {
    serviceCode:serviceCode
}