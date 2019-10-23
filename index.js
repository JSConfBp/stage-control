if(process.env.NODE_ENV !== "production") {
	require('dotenv').config()
}

const uuid = require('uuid/v4')

process.env.NONCE = uuid()

const server = require('./server')
const routing = require('./routing')
const config = require('./next.config')

console.log(process.env);


server(routing, config)