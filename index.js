const http = require("http").Server();
const mongoose = require("mongoose");
const db = require("./config/db");
const conversaService = require("./services/conversa-service");
 mongoose.connect(
 db.mongoURI
 //process.env.MONGO_URL
 );

// const mensagem = require("./models/mensagem");

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado!");

  socket.on("connect_to_room", async (data, callback) => {
    const mensagens = await conversaService.getByIdRoom(data.room);
    console.log(mensagens)
    console.log("conectado na sala");
    socket.join(data.room);
    console.log("Usuário conectado na sala: " + data.room);
    io.to(data.room).emit("users-changed", {
      user: data.user,
      event: "conectado",
    });

    callback(mensagens);
  },);

  socket.on("user-connected", (data) => {
    socket.user = data.user;
    console.log("Usuário conectado: " + data.user);
    socket.broadcast.emit("users-changed", {
      user: data.user,
      event: "conectado",
    });
  });

  socket.on("message", (data) => {
    socket.to(data.socketIdReceptor).emit("message", data);
    console.log(data);
  });

  socket.on("message_to_room", (data) => {
    console.log(data);
    conversaService.save(data);
    io.in(data.room).emit("message", data);
  });

  socket.on("disconnect", () => {
    io.emit("users-changed", { user: socket.user, event: "disconectado" });
  });
});

let port = Number(process.env.PORT || 3000);
http.listen(port, () => {
  console.log("Listening on: " + port);
});
