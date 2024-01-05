import { set, get } from '../../services/store'
import comingUpNext from '../../lib/comingUpNext'

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    const data = JSON.parse(await get('stage'))

		data.timestamp = new Date()
		data.upcoming = comingUpNext(data)
		res.send(data)

    return;
  }

  if (req.method === 'PUT') {
    await set('stage', req.body)
    const data = Object.assign({}, JSON.parse(req.body), {
      timestamp: new Date()
    })
    data.upcoming = comingUpNext(data)

    if (res.socket.server.io) {
      res.socket.server.io.emit('update', data)
    }

    res.send('OK')

    return;
  }


  res.status(405).send()
}
