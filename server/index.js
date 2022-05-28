const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const Record = require('./db/models/Record')
const { Socket } = require('dgram')

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

io.on("connection", (socket) => {
    const emitRecord = async () => {
        const records = await Record.find().select({ "empName": 1, "empId": 1, "empPos": 1, "_id": 0 })
        io.emit('loadRecord', records)
    }
    emitRecord()

    socket.on('newRecord', async (data) => {
        const newRecord = new Record(data)
        try {
            const savedRecord = await newRecord.save()
            console.log(savedRecord)
        } catch (error) {
            console.log(error)
        }
    })
})



server.listen(port, () => {
    console.log("SERVER IS UP ON PORT", port)
})