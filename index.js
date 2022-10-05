const http = require("http").Server();
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Usuário conectado!");

  socket.on("connect_to_room", (data) => {
    console.log("conectado na sala");
    socket.join(data.room);
    console.log("Usuário conectado na sala: " + data.room);
    io.to(data.room).emit("users-changed", {
      user: data.user,
      event: "conectado",
    });
  });

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
    io.in(data.room).emit("message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    io.emit("users-changed", { user: socket.user, event: "disconectado" });
  });
});

let port = Number(process.env.PORT || 3000);
http.listen(port, () => {
  console.log("Listening on: " + port);
});
