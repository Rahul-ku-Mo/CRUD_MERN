"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Task } from "./Dashboard";

const ShowTask = ({
  showModal,
  setShowModal,
}: {
  showModal: Task | null;
  setShowModal: any;
}) => {
  return (
    <Dialog open={!!showModal} onOpenChange={() => setShowModal(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{showModal?.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{showModal?.description}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
export default ShowTask;
