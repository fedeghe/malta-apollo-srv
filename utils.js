/* eslint-disable no-console */
const fs = require('fs'),
    // eslint-disable-next-line quotes
    NL = "\n",


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
