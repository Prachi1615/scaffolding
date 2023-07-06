const apiCode = `
        package com.<%=packageName%>.apis;
        import org.springframework.stereotype.Service;

        @Service("${apiNameLowerInitials}")
        public class ${apiName} {
    
        
            public ${apiOutput} execute(${apiInput} input){
                // TODO: Implement the logic here.
                return null;
            }
      `;

module.exports= {
    apiCode:apiCode
}