const uuidv1 = require('uuid/v1');

function generateUniqueID() {
    return uuidv1();
}

exports.generateUniqueID =generateUniqueID