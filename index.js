// require your server and launch it here
const server = require('./api/server')

const port = 5000

server.listen(port, () => {
   console.log('Sever listening on port', port)
})