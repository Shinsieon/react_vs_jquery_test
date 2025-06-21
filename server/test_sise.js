// server.js
const WebSocket = require("ws");
const { code_list } = require("./code_list"); // 코드 목록 가져오기
const wss = new WebSocket.Server({ port: 4000 });
console.log("WebSocket 서버 실행 중 (포트 4000)");
const coins = Object.keys(code_list);
// 임의 시세 생성 함수
function randomPrice() {
  return Math.floor(Math.random() * 50000) + 1000;
}

function randomVolume() {
  return (Math.random() * 100).toFixed(2);
}

function randomChange() {
  return (Math.random() * 10 - 5).toFixed(2);
}

// 클라이언트에 주기적으로 시세 전송
setInterval(() => {
  const randomCode = coins[Math.floor(Math.random() * coins.length)];
  const message = JSON.stringify({
    code: randomCode,
    trade_time: new Date().toISOString(),
    trade_price: randomPrice(),
    trade_volume: randomVolume(),
    change_rate: randomChange(),
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}, 1); // 0.1초마다 한 종목 업데이트
