---
[![npm version](https://badge.fury.io/js/malta-apollo-srv.svg)](http://badge.fury.io/js/malta-apollo-srv)
[![Dependencies](https://david-dm.org/fedeghe/malta-apollo-srv.svg)](https://david-dm.org/fedeghe/malta-apollo-srv)
[![npm downloads](https://img.shields.io/npm/dt/malta-apollo-srv.svg)](https://npmjs.org/package/malta-apollo-srv)
[![npm downloads](https://img.shields.io/npm/dm/malta-apollo-srv.svg)](https://npmjs.org/package/malta-apollo-srv)  
---  

This plugin is highly experimental, can be used on all files:  

Parameters :  
    - **types** : a folder (relative to malta execution one) where an index.js will export all needed types  
    - **resolvers** : a folder (relative to malta execution one) where an index.js will export all needed resolvers  
    - **context**: a path to a file that will export the needed context to be used in Apollo
    - port: this is optional, default is 4000
    - host: this is optional, default is localhost

Sample usage:  
```
malta app/source/index.html public -plugins=malta-apollo-srv[types:\"graphql/types\",resolvers:\"graphql/resolvers\",context:\"graphql/context\"]
```
or in the .json file :
```
"app/source/index.html" : "public -plugins=malta-apollo-srv[types:'graphql/types',resolvers:'graphql/resolvers',context:'graphql/context']"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.html',
    'public',
    '-plugins=malta-apollo-srv[types:\"graphql/types\",resolvers:\"graphql/resolvers\",context:\"graphql/context\"]',
    '-options=showPath:false,watchInterval:500,verbose:0'
]).start();
```
