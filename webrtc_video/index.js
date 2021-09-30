const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { emit } = require("process");
const { Socket } = require("socket.io");

const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET","POST"]
        }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/",(req, res) =>{
    res.send('server is running');
});

io.on('connection' , (socket) => {
   socket.emit('me', socket.id);

    socket.on('disconnect', () =>{
        socket.broadcast.emit('callended');
    });

    socket.on("calluser", ({userToCall,siganlData, from, name})=>{
        io.to(userToCall).emit("calluser", { signal:siganlData, from, name});
    });

    socket.on("answercall" , (data) =>{
        io.to(data,to).emit("callaccepted", data.siganl);
    });
});

server,listen(PORT, () => console,log('server is listening on port $(PORT)'));

