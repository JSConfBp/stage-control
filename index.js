if(process.env.NODE_ENV !== "production") {
	require('dotenv').config()
}

// import { v4 as uuidv4 } from 'uuid';
const { v4: uuid } = require('uuid')

process.env.NONCE = uuid()

const server = require('./server')
const routing = require('./routing')
const config = require('./next.config')

console.log(process.env);


server(routing, config)