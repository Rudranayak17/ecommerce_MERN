class ErrorHandler extends Error{
    
    constructor(message:string,public statusCode:number){
        super(message)
        this.statusCode=statusCode;

        //Ensure the correct prototype chain is maintend 
        Object.setPrototypeOf(this,ErrorHandler.prototype);


        //capture stack trace

        Error.captureStackTrace(this,this.constructor);

    };
};

export default ErrorHandler;