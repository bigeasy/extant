require('proof')(2, (okay) => {
    const { coalesce } = require('..')
    okay(coalesce(null, null), null, 'null')
    okay(coalesce(null, (function () {})(), 1), 1, 'coalesced')
})
