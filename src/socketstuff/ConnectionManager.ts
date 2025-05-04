import { socket } from "./socket";

export const connect = () => socket.connect();
export const disconnect = () => socket.disconnect();