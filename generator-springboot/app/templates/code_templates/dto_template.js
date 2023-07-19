const ejs = require('ejs');
const dtoCode = `package com.<%=groupId%>.dtos;

        public class <%=className%>DTO {
    
        
            public String <%=input%>DTO(){
                // TODO: Implement the logic here.
                String output="<%=resBody%>";
                return output;
            }

        }    
      `;

function getDtoCode(groupId, controller){
    return ejs.render(dtoCode, {
        groupId: groupId,
        className: controller.className,
        input: controller.input,
        output: controller.output, 
        resBody: controller.resBody.toString()
    });
}

module.exports= {
    getDtoCode:getDtoCode
}