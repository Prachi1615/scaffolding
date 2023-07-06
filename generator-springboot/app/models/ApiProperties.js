
export default class ApiProperties {

    constructor(
        packageName,
        apiName,
        apiOutput,
        apiInput
    ){
        this.packageName = packageName;
        this.apiName = apiName;
        this.apiOutput = apiOutput;
        this.apiInput = apiInput;
    }

    getApiName(){
        return this.apiName;
    }

    getPackageName(){
        return this.packageName;
    }

    getApiOutput(){
        return this.apiOutput;
    }

    getApiInput(){
        return this.apiInput;
    }

}