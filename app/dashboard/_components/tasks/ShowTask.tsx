"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, isValid } from "date-fns";

const ShowTask = ({ task }: { task: any }) => {
  const [open, setOpen] = useState(false);
  const dueDate = task?.dueDate ? new Date(task.dueDate) : null;
  const reminder = task?.reminder ? new Date(task.reminder) : null;

  console.log(task)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 px-2">
          <BookOpen className="size-4" />
          <span className="text-xs sr-only">Show</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Task Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="h-72 flex flex-col gap-2">
            <div>
              <strong>Title:</strong> {task?.title}
            </div>
            <div>
              <strong>Description:</strong>{" "}
              <span className="text-sm">{task?.description}</span>
            </div>
            {dueDate && isValid(dueDate) ? (
              <div>
                <strong>Duedate:</strong>{" "}
                <span className="text-sm">
                  {format(dueDate, "MMMM dd, yyyy")}
                </span>
              </div>
            ) : (
              <div>
                <strong>Duedate:</strong>{" "}
                <span className="text-sm">No due date set</span>
              </div>
            )}
            {reminder && isValid(reminder) ? (
              <div>
                <strong>Reminder:</strong>{" "}
                <span className="text-sm">
                  {format(reminder, "MMMM dd, yyyy")}
                </span>
              </div>
            ) : (
              <div>
                <strong>Reminder:</strong>{" "}
                <span className="text-sm">No reminder set</span>
              </div>
            )}
          </div>
        </DialogDescription>
        <DialogFooter>
          <div className="text-sm opacity-50">
            <strong>Created: </strong>
            {format(new Date(task.createdAt), "MMMM dd, yyyy")}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ShowTask;
