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
  name: string;
  description: string;
  column: "todo" | "progress" | "done";
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState<Task | null>(null);
  const [editModal, setEditModal] = useState<Task | null>(null);
  const [deleteModal, setDeleteModal] = useState<Task | null>(null);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskColumn, setNewTaskColumn] = useState<
    "todo" | "progress" | "done"
  >("todo");

  const columns = ["todo", "progress", "done"];

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName,
      description: newTaskDescription,
      column: newTaskColumn,
    };
    setTasks([...tasks, newTask]);
    setNewTaskModal(false);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskColumn("todo");
  };

  const updateTask = (
    taskId: string,
    newName: string,
    newDescription: string
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, name: newName, description: newDescription }
          : task
      )
    );
    setEditModal(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setDeleteModal(null);
  };

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
                                <CardContent className="p-4 flex justify-between items-center">
                                  <span>{task.name}</span>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onSelect={() => setShowModal(task)}
                                      >
                                        Show
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onSelect={() => setEditModal(task)}
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onSelect={() => setDeleteModal(task)}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                      <Button
                        onClick={() => {
                          setNewTaskColumn(
                            columnId as "todo" | "progress" | "done"
                          );
                          setNewTaskModal(true);
                        }}
                        className="mt-2 w-full"
                      >
                        Add Task
                      </Button>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </main>

      <ShowTask showModal={showModal} setShowModal={setShowModal} />
      <EditTask editModal={editModal} setEditModal={setEditModal} />
      <DeleteTask deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
      <AddTask newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal} />
    </div>
  );
}
