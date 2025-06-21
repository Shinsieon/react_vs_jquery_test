import { useMemo, useRef, useState } from "react";
import Flex from "../components/Flex";
import type { WebSocketData } from "../types";
import Table from "../components/Table";

type HogaMap = Record<string, WebSocketData>;

const HomePage = () => {
  const socket = useRef<WebSocket | null>(null);
  const [tableCount, setTableCount] = useState(20); // Default to 20 tables
  const [hogaData, setHogaData] = useState<HogaMap>({
    "KRW-BTC": {
      code: "KRW-BTC",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-ETH": {
      code: "KRW-ETH",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-XRP": {
      code: "KRW-XRP",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-ADA": {
      code: "KRW-ADA",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-SOL": {
      code: "KRW-SOL",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-DOGE": {
      code: "KRW-DOGE",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-TRX": {
      code: "KRW-TRX",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-ETC": {
      code: "KRW-ETC",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-BCH": {
      code: "KRW-BCH",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
    "KRW-ATOM": {
      code: "KRW-ATOM",
      trade_price: 0,
      change_rate: 0,
      trade_volume: 0,
      trade_time: "",
    },
  });

  const startWebSocket = () => {
    if (socket.current) {
      socket.current.close();
      socket.current = null; // Reset the socket reference
      console.log("WebSocket connection closed and reset.");
    }
    socket.current = new WebSocket("ws://localhost:4000");
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setHogaData((prev: HogaMap) => {
        const updatedData: HogaMap = {
          ...prev,
          [data.code]: data,
        };
        return updatedData;
      });
    };
    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    socket.current.onclose = () => {
      if (socket.current?.readyState === WebSocket.CLOSED) {
        console.log("WebSocket is closed");
      }
    };
  };
  const hogaColumns = [
    { key: "code", label: "Code" },
    { key: "trade_time", label: "Trade Time" },
    { key: "trade_price", label: "Trade Price" },
    { key: "change_rate", label: "Change Rate" },
    { key: "trade_volume", label: "Trade Volume" },
  ];
  const rows = useMemo(() => Object.values(hogaData), [hogaData]);
  //const rows = Object.values(hogaData)
  return (
    <div>
      <Flex direction="column" justify="center" align="center" gap={10}>
        <button
          onClick={() => {
            socket.current?.close();
          }}
        >
          stop
        </button>
        <button
          onClick={() => {
            startWebSocket();
          }}
        >
          start
        </button>
        <input
          type="text"
          placeholder="테이블 개수"
          value={tableCount}
          onChange={(e) => setTableCount(Number(e.target.value))}
        />
        <div
          style={{
            width: "100%",
            height: "100vh",
            overflowY: "scroll",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: tableCount }).map((_, index) => (
            <Table key={index} columns={hogaColumns} rows={rows} />
          ))}
        </div>
      </Flex>
    </div>
  );
};

export default HomePage;
