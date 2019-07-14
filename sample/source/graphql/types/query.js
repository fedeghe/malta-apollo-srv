module.exports = `type Query {
    movies(search:String): [Movie]
    actors: [Actor]
    directors: [Director]
    characters: [Character]
  }`;