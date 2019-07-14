const fetch = require('node-fetch'),
    consts = require('./../../api/consts.json'),
    ROOT = `http://${consts.IP}:${consts.PORT}`,
    API = {
        getMovies: () => fetch(`${ROOT}${consts.PATHS.movies}`)
            .then(response => response.json()),
        getActors: () => fetch(`${ROOT}${consts.PATHS.actors}`)
            .then(response => response.json()),
        getCharacters: () => fetch(`${ROOT}${consts.PATHS.characters}`)
            .then(response => response.json()),
        getDirectors: () => fetch(`${ROOT}${consts.PATHS.directors}`)
            .then(response => response.json())
    };
    proAll = (res, searchFor) => new Promise(resolve => setTimeout(
        () => resolve(searchFor ? res.data.filter(result => result.title.toLowerCase().search(searchFor.toLowerCase()) >= 0) : res.data),
    1));

module.exports = {
    store: {
        getMovies: search => API.getMovies().then(res => proAll(res, search)),
        getActors: () => API.getActors().then(res => proAll(res)),
        getCharacters: () => API.getCharacters().then(res => proAll(res)),
        getDirectors: () => API.getDirectors().then(res => proAll(res)),
    },
};