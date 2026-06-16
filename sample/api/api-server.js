const express = require('express'),
    cors = require('cors'),
    consts = require('./consts.json'),
    ip_addr = consts.IP,
    port = consts.PORT,
    app = express(),
    PATHS = consts.PATHS,
    sources = {
        movies: require('./movies.json'),
        actors: require('./actors.json'),
        directors: require('./directors.json'),
        characters: require('./characters.json'),
    };

app.use(cors());
app.use(express.json());

app.get(PATHS.movies, getMovies);
app.get(PATHS.actors, getActors);
app.get(PATHS.characters, getCharacters);
app.get(PATHS.directors, getDirectors);

function getMovies(req, res) {
    res.json({ data: sources.movies });
}
function getActors(req, res) {
    res.json({ data: sources.actors });
}
function getDirectors(req, res) {
    res.json({ data: sources.directors });
}
function getCharacters(req, res) {
    res.json({ data: sources.characters });
}

app.listen(port, ip_addr, function () {
    console.log('API mock listening at http://%s:%s', ip_addr, port);
});
