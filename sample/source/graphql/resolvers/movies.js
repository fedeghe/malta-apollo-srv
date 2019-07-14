module.exports = (_, {search}, ctx, info) =>
    ctx.store.getMovies(search)
    .then(movies => Promise.all([
        movies,
        ctx.store.getDirectors(movies.map(m => m.director)),
        ctx.store.getActors(),
        ctx.store.getCharacters()
    ]))
    .then(([movies, directors, actors, characters]) => movies.map(
        m => Object.assign(m,
            { director: directors.find(d => d.id === m.director) },
            { roles: m.roles.map(r => ({
                character: characters.find(c => c.id === r.character),
                actor: actors.find(a => a.id === r.actor)
            }))}
        )
    ));
