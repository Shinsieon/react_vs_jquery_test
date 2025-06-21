// server.js
const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const { code_list } = require("./code_list"); // 코드 목록 가져오기

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 클라이언트(React)와 연결되면 WebSocket 유지
wss.on("connection", (clientSocket) => {
  console.log("🔌 React 클라이언트 연결됨");

  // 업비트 WebSocket 연결
  const upbitSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

  upbitSocket.on("open", () => {
    const subscribeMsg = [
      { ticket: "node-server" },
      {
        type: "ticker",
        codes: Object.keys(code_list),
        isOnlyRealtime: true,
      },
    ];
    upbitSocket.send(JSON.stringify(subscribeMsg));
  });

  upbitSocket.on("message", (data) => {
    // 업비트에서 온 데이터를 React 쪽 클라이언트에 그대로 전달
    if (clientSocket.readyState === WebSocket.OPEN) {
      const json = JSON.parse(data.toString("utf-8"));
      clientSocket.send(JSON.stringify(json));
    }
  });

  upbitSocket.on("close", () => {
    console.log("📴 업비트 소켓 종료");
  });

  upbitSocket.on("error", (error) => {
    console.error("❗ 업비트 소켓 오류:", error);
  });

  clientSocket.on("close", () => {
    console.log("📴 React 클라이언트 연결 종료");
    if (upbitSocket.readyState === WebSocket.OPEN) {
      upbitSocket.close(); // 클라이언트가 연결을 종료하면 업비트 소켓도 종료
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
