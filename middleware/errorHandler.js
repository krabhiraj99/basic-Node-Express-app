const ErrorHandler = (err, req, res, next) => {

    const errStatus =  err.statusCode  ||  500;
    const errMessage = err.message || "Something went wrong";

    res.status(errStatus).json({
        status: errStatus,
        msg: errMessage,
        stack: err.stack
    });
}


module.exports = ErrorHandler;