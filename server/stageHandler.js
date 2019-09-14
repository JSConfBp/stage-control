const dayjs = require('dayjs')
const store = require('./store')

const schedule = require('../schedule.js')
const cssSpeakers = require('../css-speakers.js')
const jsSpeakers = require('../js-speakers.js')

const getDate = (data) => {
	return data.timestamp
}

const comingUpNext = (data) => {
	const eventDay = data.event
	const dailySchedule = schedule[eventDay]
	const date = getDate(data)
	const currentTime = parseInt(dayjs(date).format('HHmm'));

	return Object.entries(dailySchedule)
		.filter(([key, session], index, array) => {
			// find sessions due from this time
			const time = parseInt(key)
			const nextTime = array[index + 1] && parseInt(array[index + 1][0])

			if (nextTime && nextTime >= currentTime) {
				return true
			}
			return time >= currentTime
		})
		.slice(0,4) // show only the next 4
		.map(([key, sessionId]) => {
			// match sessions to actual content
			let session
			if (eventDay.startsWith('js')) {
				session = jsSpeakers.find(talk => talk.id === sessionId)
			} else {
				session = cssSpeakers.find(talk => talk.id === sessionId)
			}

			if (!session) {
				return {
					topic: sessionId
				}
			}

			session.start = `${key.slice(0,2)}:${key.slice(2)}`

			return session
		})
}

module.exports.get = async (req, res) => {
	try {
		const data = await store.get('stage')
		data.timestamp = new Date()

		data.upcoming = comingUpNext(data)

		res.send(data)
	} catch (e) {
		res.sendStatus(403)
	}
}

module.exports.put = async (req, res) => {
	try {
		await store.set('stage', req.body)
		req.app.io.emit('update', req.body);
		res.send('OK')
	} catch (e) {
		console.error(e);

		res.status(403)
		res.send(e.message)
	}
}

