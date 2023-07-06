const apiCode = `
        package com.<%=packageName%>.apis;
        import org.springframework.stereotype.Service;

        @Service("<%=className%>Api")
        public class <%=className%>Api {
    
        
            public <%=apiOutput%> execute(<%=apiInput%> input){
                // TODO: Implement the logic here.
                return null;
            }
      `;

module.exports= {
    apiCode:apiCode
}