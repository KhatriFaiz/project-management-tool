"use client";

import React, { createContext, useContext } from "react";
import { useSocket } from "@/hooks/useSocket";

const SocketContext = createContext(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children, url }) => {
  const socket = useSocket(url);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
