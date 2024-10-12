"use client";

import { useSocket } from "@/hooks/useSocket";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import { socketEvents } from "../../../common/utils/socketEvents";
import { Button } from "./ui/button";
import Link from "next/link";

const ProjectsGrid = ({ projects }) => {
  if (!projects || !projects.length) {
    return (
      <div>
        <h2>No Projects To Display</h2>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Progress</p>
                <div className="overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium">{project.progress}%</div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href={`/projects/${project._id}`}>Open</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const UserProjectsGrid = () => {
  const socket = useSocket();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.emit(socketEvents.PROJECT.fetchUserProjects, (response) => {
        if (response.success) setProjects([...response.projects]);
      });
    }
  }, [socket]);

  return <ProjectsGrid projects={projects} />;
};

export default ProjectsGrid;
