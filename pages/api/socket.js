import bodyParser from 'body-parser'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'


export const config = {
  api: {
    bodyParser: false,
  },
}

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/'
    const httpServer = res.socket.server
    const io = new IOServer(httpServer, {
      path,
      //addTrailingSlash: false
      cors: {
        origin: "*"
      }
    })
    res.socket.server.io = io
  }

  res.end()
}

export default SocketHandler
