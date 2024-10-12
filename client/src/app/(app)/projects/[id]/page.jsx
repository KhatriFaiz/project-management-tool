"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useSocket } from "@/hooks/useSocket";
import { Menu } from "lucide-react";
import { socketEvents } from "../../../../../../common/utils/socketEvents";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectOverviewPage = () => {
  const socket = useSocket();
  const params = useParams();
  const [project, setProject] = useState(null);
  const projectId = params.id;

  useEffect(() => {
    if (socket) {
      socket.emit(
        socketEvents.PROJECT.fetchProjectOverview,
        { projectId },
        (response) => {
          if (response.success) {
            setProject(response.project);
          }
        }
      );
    }
  }, [socket]);

  if (!project) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl mb-5 font-bold">Description</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectOverviewPage;
