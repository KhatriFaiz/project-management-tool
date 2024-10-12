import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    assignee: "Alice Johnson",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    dueDate: "2023-07-15",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Implement user authentication",
    assignee: "Bob Smith",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    dueDate: "2023-07-20",
    priority: "Medium",
    status: "To Do",
  },
  {
    id: 3,
    title: "Write API documentation",
    assignee: "Charlie Brown",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    dueDate: "2023-07-10",
    priority: "Low",
    status: "Done",
  },
  {
    id: 4,
    title: "Optimize database queries",
    assignee: "David Lee",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    dueDate: "2023-07-25",
    priority: "High",
    status: "To Do",
  },
  {
    id: 5,
    title: "Create mobile app wireframes",
    assignee: "Eva Garcia",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    dueDate: "2023-07-18",
    priority: "Medium",
    status: "In Progress",
  },
];

const ProjectTasksPage = () => {
  const selectedPriority = "All";
  const selectedStatus = "All";

  const filteredTasks = tasks.filter(
    (task) =>
      (selectedPriority === "All" || task.priority === selectedPriority) &&
      (selectedStatus === "All" || task.status === selectedStatus)
  );
  return (
    <duv className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-wrap items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Priority <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All", "Low", "Medium", "High"].map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={selectedPriority === priority}
                >
                  {priority}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All", "To Do", "In Progress", "Done"].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatus === status}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8 w-full sm:w-[300px]"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={task.assigneeAvatar}
                        alt={task.assignee}
                      />
                      <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                    </Avatar>
                    <span>{task.assignee}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {task.dueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.priority === "High"
                        ? "destructive"
                        : task.priority === "Medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.status === "Done"
                        ? "default"
                        : task.status === "In Progress"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </duv>
  );
};

export default ProjectTasksPage;
