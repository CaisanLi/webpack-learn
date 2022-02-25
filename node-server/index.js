const Koa = require('koa')
const static = require('koa-static')

const app = new Koa();

app.use(static('static'))

app.listen(1010)