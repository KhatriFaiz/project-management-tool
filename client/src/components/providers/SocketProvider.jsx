"use client";

import React, { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "@/lib/contants";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = new io(SERVER_URL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    socketInstance.on("connect_error", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
