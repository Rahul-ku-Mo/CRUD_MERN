"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteTask = ({deleteModal, setDeleteModal} : {
    deleteModal: any;
    setDeleteModal: any;
}) => {
  return (
    <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this task?
          </DialogDescription>
          <DialogFooter>
            <Button variant="destructive" >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
export default DeleteTask