const dotenv = require('dotenv');
dotenv.config();

// lalu kita panggil
module.exports = {
    urlDb : process.env.URL_MONGODB_DEV,
    jwtExpiration: '10m',
    jwtSecret: 'jwtSecret'
};