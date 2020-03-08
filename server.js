
const path = require('path'),
    utils = require('./utils'),
    { ApolloServer, gql } = require('apollo-server');

let srv = null;

class server {
    constructor (params, hot) {
        this.srv = null;
        this.hot = !!hot;
        this.params = params || {};
        this.port = this.params.port || 4000;
        this.host = this.params.host || 'localhost';
        this.dir = process.cwd();
        this.name = path.basename(path.dirname(__filename));
        this.started = false;
        this.srvParams = {
            typeDefs: {},
            resolvers: {},
            context: null
        };
        this.watching = [];
        this.watchers = [];
    }

    async loadConfig () {
        this.unwatch();
        return  await Promise.all([
            new Promise((solve, reject) => {
                const resolvedPath = path.resolve(this.dir, this.params.types, 'index.js'),
                    tmp = require(resolvedPath);                
                
                let x = Object.keys(tmp).reduce((acc, el) => {
                    acc.push(tmp[el]);
                    return acc;
                }, []).join(`\n`);

                this.srvParams.typeDefs = gql(x);
                this.hot && this.watching.push(resolvedPath);
                solve();
            }),
            new Promise((solve, reject) => {
                const resolvedPath = path.resolve(this.dir, this.params.resolvers, 'index.js');
                this.srvParams.resolvers = require(resolvedPath);
                this.hot && this.watching.push(resolvedPath);
                solve();
            }),
            new Promise((solve, reject) => {
                const resolvedPath = path.resolve(this.dir, `${this.params.context}.js`);
                this.srvParams.context = require(resolvedPath);
                this.hot && this.watching.push(resolvedPath);
                solve();
            })
        ]).then(this.watch.bind(this));
    }

    unwatch() {
        this.watching = [];
        this.watchers.forEach(watcher => clearInterval(watcher));
    }

    watch () {
        this.watching.forEach((file) => {
            this.watchers.push(this.doWatch(file));
        });
    }

    doWatch(fPath) {
        let age = utils.getFileTime(fPath);
        return setInterval(() => {            
            const newAge = utils.getFileTime(fPath);
            if (age < newAge) {
                age = newAge;
                this.hotReload();
            }
        }, 500)
    }

    hotReload () {
        try {
            this.loadConfig().then(() => {
                // the following cause an ERROR,
                // no clear way to change the schema on 
                // the fly with Apollo srv
                this.srv.schema = this.srvParams;                
                console.log('reloading schema');
            })
        } catch(e) {
            console.log(e)
        }
    }

    async solveParams () {
        try {
            await this.loadConfig();
        } catch (e) {
            console.log(e)
        }
    }

    start () {
        if (this.started) return;
        this.started = true;
        this.solveParams();
        try {
            this.srv = new ApolloServer(this.srvParams);
            this.srv.listen({port : this.port, host: this.host}).then(({ url }) => {
                console.log(`🚀 ${this.name.blue()} on ${url} (${url}graphql)`);
            });
        } catch (e) {
            console.log('ERROR: Something looks wrong in the configuration:')
            console.log(e)
        }
    }
}

module.exports = {
    getServer: (params, hot) => {
        if (!srv) {
            srv = new server(params, hot);
        }
        return srv;
    }
};

