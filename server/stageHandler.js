
// const store = require('./store')
// const stageData = require('./stageData')

module.exports.get = async (req, res) => {

	// if (!token) {
	// 	res.sendStatus(403)
	// 	return
	// }

	try {
		// const data = await getStageData()
		//Object.assign({}, data)
		res.send('')
	} catch (e) {
		res.sendStatus(403)
	}
}

module.exports.put = async (req, res) => {

console.log(req);


	try {

		res.send('')
	} catch (e) {
		console.error(e);

		res.status(403)
		res.send(e.message)
	}
}

