const movies = require('./movies'),
    actors = require('./actors'),
    directors = require('./directors'),
    characters = require('./characters');
module.exports = {
    Query: {
        movies,
        actors,
        characters,
        directors
    }
};