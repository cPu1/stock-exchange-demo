import koa from 'koa'
import session from 'koa-generic-session'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import path from 'path'

require('babel-polyfill')


var serve = require('koa-static')

const sessionMiddleware = session({
  cookie: {
    maxage: null
  }
})

const app = koa()
app.keys = ['benzinga']
app.use(sessionMiddleware)

app.use(mount('/static', serve(path.join(__dirname, '..', 'static'))))

import routes from './routes'
import Router from 'koa-router'
import userService from './service/user.js'
import fs from 'fs'


let userRouter = new Router()

userRouter.get('/', function *() {
  this.body = fs.createReadStream(path.join(__dirname, '/views/index.html'))
  this.set('Content-Type', 'text/html')
})

userRouter.get('/user', function *() {
  if (this.session.user) this.body = this.session.user
  else this.body = this.session.user = userService.create()
})

app.use(userRouter.middleware())

app.use(function *(next) {
  if (this.session.user) yield *next
  else this.status = 401
})

app.use(bodyParser())

routes(app)

app.listen(process.env.PORT || 8000)
console.log('listening')