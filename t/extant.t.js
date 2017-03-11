require('proof/redux')(1, prove)

function prove (assert) {
    var coalesce = require('..')
    assert(!! coalesce, 'require')
}
