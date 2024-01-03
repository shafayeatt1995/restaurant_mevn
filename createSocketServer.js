const { Order } = require("@/backend/models");
const createSocketServer = (app) => {
  // Listen the server
  const http = require("http");
  const server = http.createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      origin: [
        // "https://footyamigo.com",
        // "https://web.footyamigo.com",
        // "https://sandbox.footyamigo.com",
        // "https://copy.footyamigo.com",
        // "http://macbook.local",
        // "https://goat.footyamigo.com",
        // "https://dashboard.footyamigo.com",
        // "http://localhost:8080",
        process.env.BASE_URL,
      ],
    },
  });
  io.on("connection", (socket) => {});

  // if (process.env.ENABLE_REALTIME_ORDER_NOTIFICATION === "1") {
  //   Order.watch().on("change", async (data) => {
  //     try {
  //       const { operationType, documentKey } = data;
  //       if (operationType === "insert") {
  //         const message = data.fullDocument;
  //         const inserted_id = documentKey._id;
  //         const room_name = "order-" + inserted_id;
  //         io.to(room_name).emit(room_name, message);
  //       } else if (operationType === "update") {
  //         const arbitrage_id = documentKey._id;
  //         const message = await Arbitrage.findById(arbitrage_id);
  //         const room_name = "arbitrage-" + arbitrage_id;
  //         io.to(room_name).emit(room_name, message);
  //       }
  //     } catch (e) {
  //       console.log(e, "SOCKET ERROR");
  //     }
  //   });
  // }

  return server;
};

module.exports = { createSocketServer };
