"use client";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSocket } from "@/hooks/useSocket";
import { socketEvents } from "../../../common/utils/socketEvents";

const ProjectDetailsHeader = () => {
  const params = useParams();
  const pathname = usePathname();
  const socket = useSocket();
  const [title, setTitle] = useState(null);
  const projectId = params.id;

  useEffect(() => {
    if (socket) {
      socket.emit(
        socketEvents.PROJECT.fetchProjectOverview,
        {
          projectId: params.id,
        },
        (response) => {
          if (response.success) {
            if (response.project) {
              setTitle(response.project.title);
            }
          }
        }
      );
    }
  }, [socket]);

  const tabs = [
    { name: "Overview", href: `/projects/${projectId}` },
    { name: "Tasks", href: `/projects/${projectId}/tasks` },
    { name: "Board", href: `/projects/${projectId}/board` },
    { name: "Members", href: `/projects/${projectId}/members` },
    { name: "Settings", href: `/projects/${projectId}/settings` },
  ];

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <nav className="flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap",
                pathname === tab.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default ProjectDetailsHeader;
