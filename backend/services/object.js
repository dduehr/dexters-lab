function isEmpty(object) {
    return object === undefined || !Object.keys(object).length
}

module.exports = {
    isEmpty,
}