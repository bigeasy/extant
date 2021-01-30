exports.coalesce = function () {
    for (var i = 0, I = arguments.length; i < I; i++) {
        if (arguments[i] != null) {
            return arguments[i]
        }
    }
    return null
}
