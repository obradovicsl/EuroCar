class AppError extends Error {
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')  ? 'fail' : 'error';
        this.isOperational = true;  //Mora postojati nacin da razlikujemo nase errore, od ostalih(bug u programu npr...)

       Error.captureStackTrace(this, this.constructor);    //Pokazuje gde se tacno u kodu dogodio error
    }
}

module.exports = AppError;