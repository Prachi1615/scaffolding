
export default class ServiceProperties{

    constructor(
        packageName,
        serviceClassName,
        methodName,
        path,
        inputType,
        outputType
    ){
        this.packageName = packageName ;
        this.serviceClassName = serviceClassName ;
        this.methodName = methodName ;
        this.path = path ;
        this.inputType = inputType ;
        this.outputType = outputType ;
    }

    getpackageName(){
        return this.packageName;
    }

    getserviceClassName(){
        return this.serviceClassName;
    }

    getmethodName(){
        return this.methodName;
    }

    getpath(){
        return this.path;
    }

    getinputType(){
        return this.inputType;
    }

    getoutputType(){
        return this.outputType;
    }

}