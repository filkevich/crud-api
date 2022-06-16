import 'dotenv/config'
import { createServer } from 'http'
import requestHandler from './requestHandler'

const PORT = process.env.PORT || 3000

const server = createServer(requestHandler)
server.listen(PORT, () => console.log(`The server is running at port ${PORT}`))
