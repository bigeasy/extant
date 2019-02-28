require('proof')(2, prove)

function prove (okay) {
    var coalesce = require('..')
    okay(coalesce(null, null), null, 'null')
    okay(coalesce(null, (function () {})(), 1), 1, 'coalesced')
}
