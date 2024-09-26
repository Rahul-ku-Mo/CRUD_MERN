"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTaskActions } from "@/hooks/useTask";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
const DeleteTask = ({
  columnId,
  taskId,
}: {
  columnId: string;
  taskId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { deleteTask } = useTaskActions(columnId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2Icon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this task?
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              deleteTask.mutate(taskId as any);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteTask;
