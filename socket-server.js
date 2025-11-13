const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ room }) => {
    socket.join(room);
  });

  socket.on("message", ({ room, user, content }) => {
    const payload = {
      user,
      content,
      createdAt: new Date().toISOString()
    };
    io.to(room).emit("message", payload);
  });
});

httpServer.listen(4000, () => {
  console.log("NeuroBridge community chat running on :4000");
});
