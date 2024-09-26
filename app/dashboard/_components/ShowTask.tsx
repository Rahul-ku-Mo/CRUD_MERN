"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "./Dashboard";
import { useState } from "react";

const ShowTask = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task?.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{task?.description}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
export default ShowTask;
