"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTaskActions } from "@/hooks/useTask";
import { useState } from "react";
import { Edit2Icon } from "lucide-react";

const EditTask = ({ task }: { task: any }) => {
  const [open, setOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    title: task.title,
    description: task.description,
  });

  const { editTask } = useTaskActions(task.columnId);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    editTask.mutate({ ...task, ...editTaskData });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit2Icon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Input
          name="title"
          value={editTaskData.title}
          onChange={handleInputChange}
          className="mb-4"
          placeholder="Task Name"
        />
        <Textarea
          name="description"
          value={editTaskData.description}
          onChange={handleInputChange}
          placeholder="Task Description"
        />
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
