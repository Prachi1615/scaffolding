
export default class ControllerProperties{

    constructor(
        contollerType,
        packageName,
        path,
        controllerName,
        methodName,
        inputType,
        controllerParam
    ){
        this.controllerType = contollerType;
        this.packageName = packageName;
        this.path = path;
        this.controllerName = controllerName;
        this.methodName = methodName;
        this.inputType = inputType;
        this.controllerParam = controllerParam;
    }

    getPackageName(){
        return this.packageName;
    }

    getPath(){
        return this.path;
    }

    getControllerName(){
        return this.controllerName;
    }

    getMethodName(){
        return this.methodName
    }

    getInputType(){
        return this.inputType;
    }

    getControllerParam(){
        return this.controllerParam;
    }

    getControllerType(){
        return this.controllerType;
    }
}