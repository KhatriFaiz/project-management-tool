import React, { createContext, useState } from "react";
import { useSocketContext } from "./SocketProvider";
import { socketEvents } from "../../../../common/utils/socketEvents";

const AuthenticationContext = createContext(null);

const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const socket = useSocketContext();

  useState(() => {
    if (socket) {
      socket.on(socketEvents.AUTH.tokenNotFound, () => {
        console.log("Token not found");
      });
    }
  }, [socket]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
