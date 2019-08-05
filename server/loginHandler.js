const crypto = require('crypto')
const uuid = require('uuid/v4')
const moment = require('moment')
const { promisify } = require('util')
const fetch = require('isomorphic-unfetch')
const checkUrl = process.env.TITO_CHECK_URL
const store = require('./store')
const tokenAuth = require('./token')

const sendToken = async (res, data) => {
	const jwt = await tokenAuth.create({
		sub: data.id
	}, data.secret)

	res.status(200)
	res.send({
		token: jwt
	})
}

module.exports = async (req, res) => {
	const {
		id: ticketId
	} = req.body

	const user = await store.get(ticketId);

	if (user) {
		const data = await store.hget('users', user);
		sendToken(res, JSON.parse(data))
		return
	}

	const check = await fetch(`${checkUrl}${ticketId}`)

	if (check.status !== 200) {
		res.sendStatus(403)
		return
	}

	const id = uuid()
	const buf = await promisify(crypto.randomBytes)(256)
	const secret = buf.toString('hex')

	const data = {
		id,
		ticketId,
		secret,
		workshop: '',
		updated_at: moment().unix(),
		created_at: moment().unix()
	}

	store.set(ticketId, id)
	store.hset('users', id, JSON.stringify(data))

	sendToken(res, data)
}