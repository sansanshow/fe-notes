var url = req.url,
    // query object, parsed from query string
    query = req.query,
    // request data, parsed from request body
    data = req.data;

// get request headers
var contentType = req.headers['Content-Type'];

// next(err, data)
next(null, {
    test: 'ok',
    url: req.url,
    query: req.query,
    data: req.data,
    ct: contentType
});