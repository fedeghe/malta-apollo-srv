const srv = require('./server'),
    path = require('path');

let apollo;

function malta_apollo_srv(obj, options) {   
    const self = this,
        start = new Date(),
        pluginName = path.basename(path.dirname(__filename));

    let msg;
    
    apollo = apollo || srv.getServer(options);
    !apollo.started && apollo.start();
    
    return (solve, reject) => {
        solve(obj);
        msg = `plugin ${pluginName.white()}`;
        self.notifyAndUnlock(start, msg);
    }
}

malta_apollo_srv.ext = '*';

module.exports = malta_apollo_srv;