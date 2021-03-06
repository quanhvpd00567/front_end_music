const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const port = 8080

app.use(express.static(__dirname + '/dist'))
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
const server = http.createServer(app)
server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
