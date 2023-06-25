const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const vehicleRouter = require('./routes/vehicleRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const userRouter = require('./routes/userRoutes');
const objectRouter = require('./routes/objectRoutes');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');

const app = express();

app.use(cors());

//Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 1000,  // 100 requestova
    windowMs: 60 * 60 * 1000,  // u prozoru od 1h
    message: 'Too many requests from this IP, try again in an hour!',
});

app.use('/api', limiter); //odnosi se na sve rute koje imaju '/api'

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/rentals', rentalRouter);
app.use('/api/v1/objects', objectRouter);

//Ako dodjemo do ovog dela(linije) koda - to znaci da nismo 'upali' ni u jedan postojeci ruter, i da navedena ruta u req, ne postoji.   app.all - primenice se i na .get i na .post..... '*'-svaki URL
app.all('*', (req, res, next)=> {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;