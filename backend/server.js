const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });

const app = require('./app');

//Starting server
const port = process.env.PORT | 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shuting down...');
  server.close(() => {
    process.exit(1);
  });
});


process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shuting down...');
  server.close(() => {
    process.exit(1);
  });
});


