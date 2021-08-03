// [![Actions Status](https://github.com/bigeasy/extant/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/extant/actions)
// [![codecov](https://codecov.io/gh/bigeasy/extant/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/extant)
// [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
//
// Basically, SQL COALESCE in JavaScript; return the first value that is not null.
//
// | What          | Where                                      |
// | --- | --- |
// | Discussion    | https://github.com/bigeasy/extant/issues/1 |
// | Documentation | https://bigeasy.github.io/extant           |
// | Source        | https://github.com/bigeasy/extant          |
// | Issues        | https://github.com/bigeasy/extant/issues   |
// | CI            | https://travis-ci.org/bigeasy/extant       |
// | Coverage:     | https://codecov.io/gh/bigeasy/extant       |
// | License:      | MIT                                        |
//
// Extant installs from NPM.

// ## Overview
//
// Extant is an implementation of SQL's COALESCE that I've used for some time to
// deal with the fact that JavaScript truthiness will treat `''` and `0` as true so
// the `||` operator can't always be used to create given or default one-liner.

(function () {
    const { coalesce } = require('..')

    function foo (count) {
        count = coalesce(count, 1)
        for (let i = 0; i < count; i++) {
            console.log('hello')
        }
    }

    foo()
}) ()

// We use the name "extant" on NPM because we want the first extant argument.
//
// ## Living `README.md`
//
// This `README.md` is also a unit test using the
// [Proof](https://github.com/bigeasy/proof) unit test framework. We'll use the
// Proof `okay` function to assert out statements in the readme. A Proof unit test
// generally looks like this.

require('proof')(13, async okay => {
    // ## Usage
    //
    // The `'extant'` module exports a single `coalesce` function.

    const { coalesce } = require('..')

    // Note that Extant is SQL's `COALESCE`. It returns the first non-null-like value,
    // that is the first value that is not `== null`, which would be `null` or
    // `undefined`. If there is no such argument it returns `null`.

    const maybe = null
    let maybeNot
    okay(coalesce(maybe, maybeNot, 1), 1, 'return first non-null value')
    okay(coalesce(maybe, maybeNot), null, 'return null')
    okay(coalesce(), null, 'no arguments is also null')

    // I've used this module for a long time to initialize function arguments.

    {
        function increment (value, increment) {
            return value + coalesce(increment, 1)
        }

        okay(increment(1, 2), 3, 'specify parameter')
        okay(increment(1), 2, 'use default parameter')
    }

    // Although these days I'd probably just use the JavaScript default parameters
    // syntax.

    {
        function increment (value, increment = 1) {
            return value + increment
        }

        okay(increment(1, 2), 3, 'specify default parameter')
        okay(increment(1), 2, 'use default default parameter')
    }

    // And when Node.js 14 goes end-of-life I'll switch to `??`, but for now its still
    // useful when initializing from named parameters when you want to preserve the
    // original options array. You can always do this for simple cases.

    {
        function increment (value, { increment = 1 } = {}) {
            return value + increment
        }

        okay(increment(1, { increment: 2 }), 3, 'specify destructed named parameters')
        okay(increment(1), 2, 'use default destructed named parameters')
    }

    // But, if you wanted keep the options object around for some reason `coalesce`
    // still comes in handy.

    {
        function increment (value, options = {}) {
            return value + coalesce(options.increment, 1)
        }

        okay(increment(1, { increment: 2 }), 3, 'specify named arguments')
        okay(increment(1), 2, 'use default named arguments')
    }

    // Really would take an example where your constructing an object that has a lot of
    // options, or nested options. At that point the destructuring gets too verbose and
    // `coalesce` is more appropriate.
    //
    // Another place where it is useful is variadic functions where destructed and
    // default parameters are not an option.

    {
        function adjuster (value, ...vargs) {
            const increment = typeof vargs[0] == 'boolean' ? vargs.shift() : true
            const by = coalesce(vargs.shift(), 1)
            return value + (by * (increment ? 1 : -1))
        }

        okay(adjuster(1, true, 2), 3, 'increment variadic')
        okay(adjuster(1, false), 0, 'decrement variadic')
    }
})

// You can run this unit test yourself to see the output from the various
// code sections of the readme.
