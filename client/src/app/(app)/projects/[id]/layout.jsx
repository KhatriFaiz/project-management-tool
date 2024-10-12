import ProjectDetailsHeader from "@/components/ProjectDetailsHeader";

export default function ProjectLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <ProjectDetailsHeader />

      {/* Main content area */}
      <main className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
