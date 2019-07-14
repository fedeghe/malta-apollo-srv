var srv = require('./server'),
    path = require('path'),
    fs = require('fs');

let apollo;

function malta_apollo_srv(obj, options) {   
    console.log('called') 
    let self = this,
        start = new Date(),
        msg;
    
    apollo = apollo || srv.getServer(options);
    !apollo.started && apollo.start();
    
    return function (solve, reject) {
        solve(obj);
        msg = 'Apollo';
        self.notifyAndUnlock(start, msg);
    }
}

malta_apollo_srv.ext = '*';

module.exports = malta_apollo_srv;