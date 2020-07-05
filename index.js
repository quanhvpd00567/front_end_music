const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const port = 80

app.use(express.static(__dirname + '/dist/framertools'))
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/framertools/index.html')))
const server = http.createServer(app)
server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
