module.exports.addZero = function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}

module.exports.generateTestID = function generateTestID(postmanID) {
    postmanID += 1;
    return postmanID;
};