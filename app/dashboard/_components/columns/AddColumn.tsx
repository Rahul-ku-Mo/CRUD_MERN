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
import { useState } from "react";
import { useColumnActions } from "@/hooks/useColumn";

const AddColumn = () => {
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const { createColumn } = useColumnActions();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!newColumnName) {
      return;
    }

    createColumn.mutate({
      name: newColumnName,
    } as any);

    setNewColumnName("");

    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            Add Column
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <DialogHeader>
              <DialogTitle>Create New Column</DialogTitle>
            </DialogHeader>
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Column Name"
              className="mb-4"
            />
            <DialogFooter>
              <Button type="submit">Create Column</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddColumn;
