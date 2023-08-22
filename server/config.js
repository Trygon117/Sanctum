require('dotenv').config();

const connections = {
    development: {
        http: {
            port: 3001,
        },
        mongo: `${process.env.MONGODB_URI}/Development?retryWrites=true&w=majority` || 'mongodb://localhost/Sanctum',
        redis: process.env.REDISCLOUD_URL,
    },
    production: {
        http: {
            port: process.env.PORT || process.env.NODE_PORT || 3001,
        },
        mongo: `${process.env.MONGODB_URI}/Production?retryWrites=true&w=majority`,
        redis: process.env.REDISCLOUD_URL,
    },
};

module.exports = {
    connections: connections[process.env.NODE_ENV],
    secret: process.env.SECRET,
};
