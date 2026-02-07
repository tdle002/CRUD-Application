// created a utility function to send custom error message
export const createError = (statusCode, message) =>{
    const error = new Error(message);
    error.message = message;
    error.statusCode = statusCode;
    return error;
};