import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CreateProjectForm from "@/components/forms/CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 flex gap-5 items-center">
          <Button asChild variant="ghost">
            <Link href="/projects">
              <ChevronLeft className="w-6 h-6 mr-3" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Create New Project</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill in the information to create a new project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateProjectForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
