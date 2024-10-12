import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/Sidebar";
import { SocketProvider } from "@/components/providers/SocketProvider";

const AppLayout = ({ children }) => {
  return (
    <SocketProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-col h-screen w-full">
          <Header />
          {children}
        </div>
      </div>
    </SocketProvider>
  );
};

export default AppLayout;
