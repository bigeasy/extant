describe('extant', () => {
    const assert = require('assert')
    it('can coalesce', () => {
        const coalesce = require('..')
        assert(coalesce(null, null) == null, 'null')
        assert.equal(coalesce(null, (function () {})(), 1), 1, 'coalesced')
    })
})
