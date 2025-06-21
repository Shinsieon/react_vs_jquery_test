export interface WebSocketData {
  code: string;
  trade_price: number;
  change_rate: number;
  trade_volume: number;
  trade_time: string;
  // This is useful for handling any extra fields that may come in the WebSocket data
}

export interface WebSocketMessage {
  key: string;
  data: WebSocketData | null;
}
