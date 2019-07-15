## Sample usage of malta-apollo-srv plugin

First of all I set up a small api server in the `api` folder. Once started, it provides some rest GET endpoints:  
- /movies to retrieve all star war movies
- /actors to retrieve all actors
- /directors to retrieve all directors
- /characters to retrieve all characters

This is absolutely arguable, but here it is all I needed, in fact all this sample aims to show is how to use the plugin solving the n+1 problem in a common way. Thus, first thing, start the api server(all commands have to be run within the sample folder):  

```
yarn && yarn apistart
```
and let it run.

In this sample most of the object are quite plain but the first citizen is not, the movie
```
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
}
```

The _resolver_ for the movie will have to do some job, but nothing special.


The plugin itself needs some mandatory parameters as explained <a href="https://github.com/fedeghe/malta-apollo-srv">here</a> and in this example refer to the following:

![structure](https://raw.githubusercontent.com/fedeghe/malta-apollo-srv/master/sample/rel.png)

Now it's time to run a client which will fetch data from the running apollo server started from the plugin, and show it somewhere on the page.
```
yarn build
```
In all parameters are right the apollo server will be started and we'll see on the console something like:
```
🚀 malta-apollo-srv on http://localhost:4000/ (http://localhost:4000//graphql)
```
by the way, in this sample I am also using `malta-dev-srv` to be able to serve the `dist/index.html` on **http://localhost:3001** which contains the consuming sample. Aside one can still access the <a href="http://localhost:4000/graphql">graphql</a> straight in the browser to test queries.