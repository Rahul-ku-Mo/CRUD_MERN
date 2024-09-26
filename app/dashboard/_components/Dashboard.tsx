"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, LogOut } from "lucide-react";
import ShowTask from "./ShowTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import AddTask from "./AddTask";

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  column: "todo" | "progress" | "done";
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = ["todo", "progress", "done"];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const columnTasks = tasks.filter(
        (task) => task.column === source.droppableId
      );
      const reorderedTasks = Array.from(columnTasks);
      const [reorderedItem] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, reorderedItem);

      const updatedTasks = tasks.map((task) =>
        task.column === source.droppableId
          ? reorderedTasks[tasks.indexOf(task)] || task
          : task
      );

      setTasks(updatedTasks);
    } else {
      // Moving between columns
      const updatedTasks = tasks.map((task) => {
        if (task.id === result.draggableId) {
          return {
            ...task,
            column: destination.droppableId as "todo" | "progress" | "done",
          };
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Task Manager</h1>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => console.log("Logout clicked")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columns.map((columnId) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-gray-200 p-4 rounded-lg"
                    >
                      <h2 className="font-bold mb-4 capitalize">{columnId}</h2>
                      {filteredTasks
                        .filter((task) => task.column === columnId)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2"
                              >
                                <CardContent className="p-4 flex justify-between items-center gap-12">
                                  <div>{task.title}</div>
                                  <p>{task.description}</p>

                                  <div className="flex gap-2">
                                    <ShowTask task={task} />
                                    <EditTask task={task} />
                                    <DeleteTask
                                      columnId={task.columnId}
                                      taskId={task.id}
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                      <AddTask columnId={columnId} />
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
