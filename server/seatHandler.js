const getSeats = require('./getSeats')

module.exports.get = async (req, res) => {
	const seatMap = await getSeats()

	res.status(200)
	res.send(seatMap)
}