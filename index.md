Look at the [Docco](./docco/) for now.

Note that Extant is SQL's `COALESCE`. It is generally useful and I pull it into
any program that needs to perform the common default value if  `null`
intialization. I'll hold off when it can be done with `||`, as in:

```javascript
function invokeFoo (options) {
    options || (options = {})
    foo(options)
}
```

But the moment I'm reaching for the ternary operator, I use Extant.

```javascript
var coalesce = require('extant')

function invokeFoo (count) {
    count = coalesce(count, 0)
    invokeFoo(count)
}
```

In the above, falsy values are valid values, so you must make an explicit check
for null.
