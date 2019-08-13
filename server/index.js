const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routeCache = require('route-cache');
const SocketIO = require('socket.io');
const cors = require('cors')

const router = require('./router')
const errorHandler = require('./errorHandler')
const stageHandler = require('./stageHandler')

const dev = process.env.NODE_ENV !== 'production'

module.exports = function (getRoutes, config) {
	const app = next({ dev, conf: config })
	const handle = app.getRequestHandler()
	const nextConfig = app.nextConfig

	const initNext = (app) => {
		return app
			.prepare()
			.then((...args) => {

				const server = express()
				const httpServer = require('http').createServer(server)
				const io = SocketIO(httpServer, {
					path: 'socket',
					cookie: false,
					origins: '*',
				})
				
				io.on('connection', () => {
					console.log('io connection')
				})

				server.io = io
				server.use(cookieParser())
				server.nextConfig = app.nextConfig
				server.routeCache = routeCache

				return server
			})
	}

	const attachRoutes = (server) => {
		const jsonParser = bodyParser.json()
		server.get('/api/stage', jsonParser, stageHandler.get)
		server.put('/api/stage', jsonParser, stageHandler.put)

		/* server.use('/api/*', express.json())
		server.post('/api/login', loginHandler)
		server.post('/api/user', userHandler.post)
		server.delete('/api/user', userHandler.delete)

		server.get('/api/seats', cors(), routeCache.cacheSeconds(60), seatHandler.get) */

		return server
	}

	const attachNextRoutes = (server) => {
		const routes = router(app, getRoutes)

		server.use('/', routes)
		server.get('*', (req, res) => handle(req, res))

		return server
	}

	const startServer = (server) => {
		const { port } = config

		server.listen(port, (err) => {
			if (err) throw err
			console.log(`> Ready on http://0.0.0.0:${port}`)
		})
	}

	return Promise.resolve(app)
		.then(initNext)
		.then(attachRoutes)
		.then(attachNextRoutes)
		.then(startServer)
		.catch(errorHandler)
}
