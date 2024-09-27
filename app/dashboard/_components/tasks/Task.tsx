import { Card, CardContent } from "@/components/ui/card";
import ShowTask from "./ShowTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { format } from "date-fns";
import { CalendarIcon, BellIcon } from "lucide-react";

const Task = ({ task, provided }: { task: any; provided: any }) => {
  const formattedCreatedDate = format(
    new Date(task?.createdAt),
    "MMMM dd, yyyy"
  );
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "MMMM dd, yyyy")
    : null;
  const formattedReminder = task.reminder
    ? format(new Date(task.reminder), "MMMM dd, yyyy HH:mm")
    : null;

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="mx-2 mb-2"
    >
      <CardContent className="p-4 flex flex-col justify-between gap-4 min-h-[180px]">
        <div className="flex flex-col grow">
          <h2 className="font-bold">{task.title}</h2>
          <p className="opacity-70 text-sm flex-grow">{task.description}</p>
        </div>
        <div className="flex flex-col gap-2 text-xs">
          {formattedDueDate && (
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Due: {formattedDueDate}
            </div>
          )}
          {formattedReminder && (
            <div className="flex items-center">
              <BellIcon className="w-4 h-4 mr-2" />
              Reminder: {formattedReminder}
            </div>
          )}
        </div>
        <div className="flex justify-between items-end">
          <span className="text-xs">{formattedCreatedDate}</span>
          <div className="flex gap-2">
            <ShowTask task={task} />
            <EditTask task={task} />
            <DeleteTask columnId={task.columnId} taskId={task.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
