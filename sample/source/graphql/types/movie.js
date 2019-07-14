module.exports = `
type Role {
    character: Character!
    actor: Actor!
}
type Movie {
    id: ID!
    title: String!
    poster: String
    date: String!
    director: Director!
    roles: [Role!]!
    ref: String
}`;