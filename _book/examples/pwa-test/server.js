var Koa = require('koa');
var Static = require('koa-static');
var path = require('path');

const app = new Koa();
const staticPath = './public';

app.use(Static(path.resolve(__dirname, staticPath)));
app.listen(9000, () => {
  console.log('koa listen on 9000');
});