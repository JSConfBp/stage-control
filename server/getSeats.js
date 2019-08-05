const store = require('./store')
const workshopData = require('../workshops')

module.exports = async () => {
	const userIds = (await store.hgetall('users')) || {}

	const pickedWorkshops = Object.values(userIds)
		.map(value => JSON.parse(value))
		.map(user => user.workshop)

	const initialSeatMap = Object.entries(workshopData).reduce((obj, [id, ws]) => {
		obj[id] = {
			seats: ws.seats,
			taken: 0
		}
		return obj
	},{})

	const seatMap = pickedWorkshops.reduce((obj, ws) => {
		if (!ws) return obj

		obj[ws].taken += 1

		return obj
	}, initialSeatMap)

	return seatMap
}