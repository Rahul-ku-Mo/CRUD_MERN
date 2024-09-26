"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "./Dashboard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EditTask = ({
  editModal,
  setEditModal,
}: {
  editModal: Task | null;
  setEditModal: any;
}) => {
  return (
    <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Input
          value={editModal?.name || ""}
          onChange={(e) =>
            setEditModal((prev: any) =>
              prev ? { ...prev, name: e.target.value } : null
            )
          }
          className="mb-4"
          placeholder="Task Name"
        />
        <Textarea
          value={editModal?.description || ""}
          onChange={(e) =>
            setEditModal((prev: any) =>
              prev ? { ...prev, description: e.target.value } : null
            )
          }
          placeholder="Task Description"
        />
        <DialogFooter>
          <Button
          // onClick={() =>
          //   editModal &&
          // //  updateTask(editModal.id, editModal.name, editModal.description)
          // }
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditTask;
