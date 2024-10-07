import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col h-screen w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
