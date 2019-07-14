var query = queryBuilder(),
    search = document.getElementById('search'),
    target = document.getElementById('target');
function queryBuilder(searchFor) {
    var search = ''
    if (searchFor) {
        search = `(search:"${searchFor}")`
    }
    var q =  `{
        movies${search}{
            title,
            date
            poster,
            ref,
            director{
                name
                ref
            }
            roles{
                actor{
                    name
                    ref
                }
                character{
                    name
                    ref
                }
            }
        }
    }`
    return { query: q };
}

function render(response) {
    var movies = response.data.movies,
        len = movies.length;
    target.innerHTML = '';
    movies.forEach(m => renderMovie(m));
}

function renderMovie(movie) {
    var main = document.createElement('div'),
        title = document.createElement('h3'),
        poster = document.createElement('img'),
        posterAnchor = document.createElement('a'),

        directorLabel = document.createElement('label'), 
        director = document.createElement('a'), 
        date = document.createElement('p'), 
        actors = document.createElement('ul'),
        others = document.createElement('li');
    main.className = 'movie';

    director.innerText = movie.director.name;
    director.setAttribute('href', movie.director.ref);
    directorLabel.innerText = 'Director: ';
    date.innerText = 'Date: ' + movie.date;

    title.innerText = movie.title;
    main.appendChild(title);
    main.appendChild(directorLabel);
    main.appendChild(director);
    main.appendChild(date);

    if (movie.poster) {
        posterAnchor.setAttribute('href', movie.ref)
        posterAnchor.setAttribute('target', '_blank')
        poster.setAttribute('src', movie.poster);
        posterAnchor.appendChild(poster);
        main.appendChild(posterAnchor);
    }
    movie.roles.forEach(role => {
        var cnt = document.createElement('li'),
            playing = document.createElement('span'), 
            aActor = document.createElement('a'),
            aCharacter = document.createElement('a');

        aActor.setAttribute('href', role.actor.ref);
        aActor.setAttribute('target', '_blank');
        aCharacter.setAttribute('href', role.character.ref);
        aCharacter.setAttribute('target', '_blank');
        aActor.innerText = role.actor.name;
        aCharacter.innerText = role.character.name;
        playing.innerText = ' as ';
        cnt.appendChild(aActor)
        cnt.appendChild(playing)
        cnt.appendChild(aCharacter)
        actors.appendChild(cnt);
    });
    others.innerText = '...and many others';
    actors.appendChild(others);
    main.appendChild(actors);
    target.appendChild(main);
}

request(query, render)


search.addEventListener('change', function (e) {
    var value = e.target.value || null;
    request(queryBuilder(value), render)
})