import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ClipboardListIcon } from "lucide-react";
import { LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/partials/Sidebar";
import BarChart from "@/components/charts/BarChart";

export default function Home() {
  return (
    <>
      <main className="flex-1 bg-muted/40 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>
                  Projects currently in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LayoutGridIcon className="w-5 h-5" />
                      <span className="font-medium">Project A</span>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LayoutGridIcon className="w-5 h-5" />
                      <span className="font-medium">Project B</span>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LayoutGridIcon className="w-5 h-5" />
                      <span className="font-medium">Project C</span>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="text-sm text-primary"
                  prefetch={false}
                >
                  View all projects
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardListIcon className="w-5 h-5" />
                      <span className="font-medium">Design review</span>
                    </div>
                    <Badge variant="outline">Due Tomorrow</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardListIcon className="w-5 h-5" />
                      <span className="font-medium">Finalize roadmap</span>
                    </div>
                    <Badge variant="outline">Due in 3 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardListIcon className="w-5 h-5" />
                      <span className="font-medium">Prepare presentation</span>
                    </div>
                    <Badge variant="outline">Due in 5 days</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="text-sm text-primary"
                  prefetch={false}
                >
                  View all tasks
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Active team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">John Doe</span>
                    </div>
                    <Badge variant="outline">Project Manager</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Jane Smith</span>
                    </div>
                    <Badge variant="outline">Developer</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Michael Brown</span>
                    </div>
                    <Badge variant="outline">Designer</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="text-sm text-primary"
                  prefetch={false}
                >
                  View all team members
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>
                  Overview of project milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <LineChart className="w-full aspect-[4/3]" /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Team Workload</CardTitle>
                <CardDescription>
                  Distribution of tasks across the team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart className="w-full aspect-[4/3]" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
