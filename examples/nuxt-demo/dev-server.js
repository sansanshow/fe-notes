
var express = require('express')
var path = require('path')
var port = process.env.PORT || 3001
var app = express()
var uri = 'http://localhost:' + port
app.use(require('connect-cgi-mock')({
    root: path.resolve(__dirname, './cgiMock'),
    route: '/api'
}))
console.log('> Starting dev server...')
var server = app.listen(port)
console.log('> Listening at ' + uri + '\n')