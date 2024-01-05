import dayjs from 'dayjs'
import schedule from '../schedule'
import dayOne from '../js1-speakers'
import dayTwo from '../js2-speakers'

const jsSpeakers = [
	...dayOne,
	...dayTwo,
]

const getDate = (data) => {
	const tzOffset = (new Date()).getTimezoneOffset()
	const msOffset = ((2 * 60) + tzOffset) * (60 * 1000);
	return new Date(+data.timestamp + msOffset)
}

export default (data) => {
  //console.log(data)

	const { event } = data
	const dailySchedule = schedule[event]
	const date = getDate(data)
	const currentTime = parseInt(dayjs(date).format('HHmm'));

	return Object.entries(dailySchedule)
		.filter(([key], index, array) => {
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
			session = jsSpeakers.find(talk => talk.id === sessionId)

			const paddedKey = key.padStart(4, '0');
			const start = `${paddedKey.slice(0,2)}:${paddedKey.slice(2)}`

			if (!session) {
				return {
					start,
					topic: sessionId
				}
			}

			session.start = start

			return session
		})
}
