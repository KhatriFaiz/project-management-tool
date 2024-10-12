"use client";

import { UserProjectsGrid } from "@/components/ProjectsGrid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Overhaul of company website",
      progress: 75,
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "New iOS and Android app",
      progress: 40,
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q4 product launch campaign",
      progress: 60,
    },
    {
      id: 4,
      name: "Database Migration",
      description: "Upgrade to new database system",
      progress: 30,
    },
    {
      id: 5,
      name: "Customer Portal",
      description: "Self-service customer dashboard",
      progress: 80,
    },
    {
      id: 6,
      name: "AI Integration",
      description: "Implement AI-powered features",
      progress: 15,
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <Button asChild>
          <Link href="/create-project">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      <UserProjectsGrid />
    </main>
  );
};

export default ProjectsPage;
