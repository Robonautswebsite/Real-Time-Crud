const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const Record = require('./db/models/Record')
const SocketIOFile = require('socket.io-file');

const router = require('./router')

require('./db/mongoose.js')

const app = express()


const server = http.createServer(app)

const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

const io = new Server(server, {
    cors: {
        origin: "https://realtime-crud.netlify.app",
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

    // Image upload
    var count = 0;
    var uploader = new SocketIOFile(socket, {
        uploadDir: 'uploads',
        chunkSize: 10240,
        transmissionDelay: 0,
        overwrite: false,
        rename: function (filename) {
            var split = filename.split('.');
            var fname = split[0];
            var ext = split[1];

            return `${fname}_${count++}.${ext}`;
        }
    });
    uploader.on('complete', (fileInfo) => {
        console.log('Upload Complete.');
        console.log(fileInfo);
        io.emit('showAlert', `File named: ${fileInfo.name}\nUPLOADED SUCCESSFULLY TO SERVER\nat location: ${fileInfo.uploadDir}`)
    });
})



server.listen(port, () => {
    console.log("SERVER IS UP ON PORT", port)
})