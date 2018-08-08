var server = require('./server')
var router = require('./router')
var requestHandlers = require('./requestHandlers')

var handle = {}
handle['/'] = requestHandlers.root
handle['/start'] = requestHandlers.start
handle['/asyc'] = requestHandlers.asyc
handle['/upload'] = requestHandlers.upload
handle['/show'] = requestHandlers.show
server.start(router.route, handle)