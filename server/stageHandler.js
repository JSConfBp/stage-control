const store = require('./store')
// const stageData = require('./stageData')

module.exports.get = async (req, res) => {

	// if (!token) {
	// 	res.sendStatus(403)
	// 	return
	// }

	try {
		const data = await store.get('stage')
		res.send(data)
	} catch (e) {
		res.sendStatus(403)
	}
}

module.exports.put = async (req, res) => {
	try {
		await store.set('stage', req.body)
		req.app.io.emit('broadcast', req.body);
		res.send('OK')
	} catch (e) {
		console.error(e);

		res.status(403)
		res.send(e.message)
	}
}

