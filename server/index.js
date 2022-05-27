const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')

require('./db/mongoose.js')

const app = express()

const server = http.createServer(app)

const port = 5000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
})

server.listen(port, () => {
    console.log("SERVER IS UP ON PORT", port)
})