"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTaskActions } from "@/hooks/useTask"
import { Edit2Icon, CalendarIcon, BellIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

const EditTask = ({ task }: { task: any }) => {
  const [open, setOpen] = useState(false)
  const [editTaskData, setEditTaskData] = useState({
    title: task.title,
    description: task.description,
    order: task.order,
    columnId: task.columnId,
    dueDate: task.dueDate ? new Date(task.dueDate) : null,
    reminder: task.reminder ? new Date(task.reminder) : null,
  })

  const { editTask } = useTaskActions()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setEditTaskData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | null, field: 'dueDate' | 'reminder') => {
    setEditTaskData((prev) => ({
      ...prev,
      [field]: date,
    }))
  }

  const handleSaveChanges = () => {
    editTask.mutate({ ...task, ...editTaskData })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 px-2 bg-blue-500 text-white">
          <Edit2Icon className="size-4" />
          <span className="text-xs sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={editTaskData.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={editTaskData.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <div className="col-span-3">
              <DatePicker
                selected={editTaskData.dueDate}
                onChange={(date) => handleDateChange(date, 'dueDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                customInput={
                  <div className="flex items-center">
                    <Input
                      value={editTaskData.dueDate ? editTaskData.dueDate.toLocaleString() : ''}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button type="button" variant="outline" className="rounded-l-none">
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </div>
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reminder" className="text-right">
              Reminder
            </Label>
            <div className="col-span-3">
              <DatePicker
                selected={editTaskData.reminder}
                onChange={(date) => handleDateChange(date, 'reminder')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                customInput={
                  <div className="flex items-center">
                    <Input
                      value={editTaskData.reminder ? editTaskData.reminder.toLocaleString() : ''}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button type="button" variant="outline" className="rounded-l-none">
                      <BellIcon className="h-4 w-4" />
                    </Button>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask