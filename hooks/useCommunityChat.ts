"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useCommunityChat(room: string, userName: string) {
  const [messages, setMessages] = useState<
    { user: string; content: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:4000");
    }
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-room", { room });

    const handler = (msg: {
      user: string;
      content: string;
      createdAt: string;
    }) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handler);

    return () => {
      socket?.off("message", handler);
    };
  }, [room]);

  const sendMessage = (content: string) => {
    if (!socket) return;
    socket.emit("message", { room, user: userName, content });
  };

  return { messages, sendMessage };
}
