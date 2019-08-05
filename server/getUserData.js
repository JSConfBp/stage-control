const moment = require('moment')
const store = require('./store')
const tokenAuth = require('./token')

module.exports = async (token) => {
	const payload = await tokenAuth.decode(token)
	const id = payload.sub
	const data = JSON.parse(await store.hget('users', id))
	const result = Object.assign({}, data)
	data.updated_at = moment().unix()
	store.set(id, data);

	return result
}