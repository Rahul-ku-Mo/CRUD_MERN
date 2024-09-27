"use client";

import { Draggable } from "react-beautiful-dnd";
import Task from "../tasks/Task";
import AddTask from "../tasks/AddTask";
import { XIcon } from "lucide-react";
import { useColumnActions } from "@/hooks/useColumn";

const ColumnCard = ({ column, provided }: { column: any; provided: any }) => {
  const { deleteColumn } = useColumnActions();

  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className="bg-white rounded-lg flex-grow"
    >
      <div className="font-bold mb-4 capitalize flex justify-between text-white items-center bg-primary rounded-t-md p-4">
        <span>{column?.name}</span>
        <XIcon
          className="size-4 inline-block ml-2 cursor-pointer"
          onClick={() => {
            deleteColumn.mutate(column.id);
          }}
        />
      </div>
      {column?.tasks?.map((task: any) => (
        <Draggable key={task.id} draggableId={task.id} index={task.order}>
          {(provided) => <Task task={task} provided={provided} />}
        </Draggable>
      ))}
      {provided.placeholder}
      <div className="px-2 pb-2">
        <AddTask columnId={column.id} />
      </div>
    </div>
  );
};

export default ColumnCard;
