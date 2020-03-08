/* eslint-disable no-console */
const fs = require('fs'),
    /**
     * Gets the file time.
     *
     * @param      {<type>}  path    The path
     * @return     {<type>}  The file time.
     */
    getFileTime = thepath => fs.existsSync(thepath)
        && fs.statSync(thepath).mtime.getTime();

module.exports = {
    getFileTime,
};
