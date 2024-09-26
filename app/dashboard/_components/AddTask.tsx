"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTaskActions } from "@/hooks/useTask";

const AddTask = ({ columnId }: { columnId: string }) => {
  const [open, setOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const { createTask } = useTaskActions(columnId);

  const handleCreate = () => {
    if (!newTaskName || !newTaskDescription) {
      return;
    }

    createTask.mutate({
      name: newTaskName,
      description: newTaskDescription,
      column: columnId,
    } as any);

    setNewTaskName("");
    setNewTaskDescription("");

    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <Input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Task Name"
            className="mb-4"
          />
          <Textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task Description"
          />
          <DialogFooter>
            <Button onClick={handleCreate}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddTask;
