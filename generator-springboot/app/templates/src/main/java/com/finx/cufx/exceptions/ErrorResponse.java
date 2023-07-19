package com.fincuro.loan.exception;

public class ErrorResponse {
    private String timestamp;
    private int code;
    private String message;

    public ErrorResponse(String timestamp,int code, String message){
        this.timestamp=timestamp;
        this.code=code;
        this.message=message;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
