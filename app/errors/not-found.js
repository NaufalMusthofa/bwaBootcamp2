// import http status code nya dari node modules
const {StatusCodes} = require('http-status-codes');
// import custom-api-error
const CustomAPIError = require('./custom-api-error');

class NotFound extends CustomAPIError{
    constructor(message){
        super(message);
        // memberikan status code not found
        this.notFound = StatusCodes.NOT_FOUND;
    };
};

module.exports = NotFound;