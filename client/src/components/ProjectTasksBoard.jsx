"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const dragStyles = {
  dragging: "cursor-grabbing opacity-50 bg-accent",
  notDragging: "cursor-grab hover:bg-accent/50",
};

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Design new landing page",
        description: "Create a modern and engaging landing page design",
        assignee: {
          name: "Alice",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        priority: "high",
      },
      {
        id: "task-2",
        title: "Implement user authentication",
        description: "Set up secure user authentication system",
        assignee: {
          name: "Bob",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        priority: "medium",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-3",
        title: "Develop API endpoints",
        description: "Create RESTful API endpoints for the application",
        assignee: {
          name: "Charlie",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        priority: "high",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task-4",
        title: "Set up CI/CD pipeline",
        description: "Implement continuous integration and deployment",
        assignee: {
          name: "David",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        priority: "low",
      },
    ],
  },
];

export default function ProjectTasksBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // If the item is dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) {
      return;
    }

    // Create new array of tasks for source column
    const sourceTasks = Array.from(sourceColumn.tasks);
    // Remove the task from the source column
    const [removedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // If moving within the same column
      sourceTasks.splice(destination.index, 0, removedTask);
      const newColumns = columns.map((col) =>
        col.id === sourceColumn.id ? { ...col, tasks: sourceTasks } : col
      );
      setColumns(newColumns);
    } else {
      // If moving to a different column
      const destTasks = Array.from(destColumn.tasks);
      destTasks.splice(destination.index, 0, removedTask);
      const newColumns = columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destColumn.id) {
          return { ...col, tasks: destTasks };
        }
        return col;
      });
      setColumns(newColumns);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Tasks Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <Badge variant="secondary">{column.tasks.length}</Badge>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`space-y-2 min-h-[100px] ${
                          snapshot.isDraggingOver ? "bg-accent/50" : ""
                        }`}
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-card rounded-lg shadow-sm p-3 transition-all ${
                                  snapshot.isDragging
                                    ? dragStyles.dragging
                                    : dragStyles.notDragging
                                }`}
                              >
                                <h3 className="font-semibold mb-1">
                                  {task.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {task.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={task.assignee.avatar}
                                        alt={task.assignee.name}
                                      />
                                      <AvatarFallback>
                                        {task.assignee.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">
                                      {task.assignee.name}
                                    </span>
                                  </div>
                                  <Badge
                                    variant={
                                      task.priority === "high"
                                        ? "destructive"
                                        : task.priority === "medium"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <Button variant="ghost" className="w-full mt-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
