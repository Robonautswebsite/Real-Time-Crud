const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const Record = require('./db/models/Record')

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
        const records = await Record.find().select({ "empName": 1, "empId": 1, "empPos": 1 })
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
        emitRecord()
    })

    socket.on('deleteRecord', async (data) => {
        await Record.deleteOne({ _id: data.recordId })
            .then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
        emitRecord()
    })

    socket.on('updateRecord', async (data) => {
        await Record.findOneAndUpdate(
            { _id: data.recordId },
            {
                empId: data.empId,
                empName: data.empName,
                empPos: data.empPos
            }
        ).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
        emitRecord()
    })
})



server.listen(port, () => {
    console.log("SERVER IS UP ON PORT", port)
})