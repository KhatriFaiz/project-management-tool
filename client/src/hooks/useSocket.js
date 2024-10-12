"use client";

import { SocketContext } from "@/components/providers/SocketProvider";
import { useContext, useEffect } from "react";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {}, [socket]);

  return socket;
};
