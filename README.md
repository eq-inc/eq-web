# eq-web
Express wrapper

## Example

### Config
```js
module.exports = {
    logger: {
        appenders: {
            console: {
                type: 'console',
                layout: {
                    json: true
                }
            }
        },
        loggers: {
            default: {
                appenders: ['console'],
                level: 'debug'
            }
        }
    }
}
```

### Application
```js

web.configure(require('./config'));
web.listen(web.app());

```

