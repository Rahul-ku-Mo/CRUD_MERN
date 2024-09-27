"use client";

import { useState, useCallback, useMemo } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import Navbar from "./Navbar";
import ColumnCard from "./columns/ColumnCard";
import { useColumn, useColumnActions } from "@/hooks/useColumn";
import AddColumn from "./columns/AddColumn";
import { queryClient } from "@/lib/queryClient";

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  column: string;
  User: any;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  dueDate: Date | null
  reminder: Date | null
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"cards" | "columns">("cards")
  const [sortBy, setSortBy] = useState<"dueDate" | "createdAt">("createdAt")
  const { data: columns, isPending } = useColumn();

  const { updateTaskOrder } = useColumnActions();

  const filteredAndSortedColumns = useMemo(() => {
    if (!columns) return []

    const filtered = filterType === "columns"
      ? columns.filter((column: any) =>
          column.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : columns.map((column: any) => ({
          ...column,
          tasks: column.tasks.filter(
            (task: Task) =>
              task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))

    return filtered.map((column: any) => ({
      ...column,
      tasks: column.tasks.sort((a: Task, b: Task) => {
        if (sortBy === "dueDate") {
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }),
    }))
  }, [columns, searchTerm, filterType, sortBy])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      let updatedSourceTasks: any = [];
      let updatedDestinationTasks: any = [];

      if (!destination) return;

      queryClient.setQueryData(["columns"], (prevColumns: any) => {
        const newColumns = [...prevColumns];

        const sourceColIndex = newColumns.findIndex(
          (col) => col.id === source.droppableId
        );
        const destColIndex = newColumns.findIndex(
          (col) => col.id === destination.droppableId
        );

        const sourceCol = newColumns[sourceColIndex];
        const destCol = newColumns[destColIndex];

        const sourceTasks = [...sourceCol.tasks];
        const destTasks =
          sourceCol === destCol ? sourceTasks : [...destCol.tasks];

        const [movedTask] = sourceTasks.splice(source.index - 1, 1);
        destTasks.splice(destination.index, 0, movedTask);

        updatedDestinationTasks = destTasks.map((task, index) => ({
          ...task,
          order: index + 1,
          columnId: destCol.id,
        }));

        updatedSourceTasks = sourceTasks.map((task, index) => ({
          ...task,
          order: index + 1,
          columnId: sourceCol.id,
        }));

        newColumns[sourceColIndex] = {
          ...sourceCol,
          tasks: updatedSourceTasks,
        };

        if (sourceCol !== destCol) {
          newColumns[destColIndex] = {
            ...destCol,
            tasks: updatedDestinationTasks,
          };
        }

        return newColumns;
      });

      updateTaskOrder.mutate({
        sourceTasks: updatedSourceTasks,
        destinationTasks: updatedDestinationTasks,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      });
    },
    [columns, updateTaskOrder]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-6 sm:px-6 lg:px-8">
        <div className="px-4 pb-6 sm:px-0">
        <div className="flex space-x-4 mb-6">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select
              value={filterType}
              onValueChange={(value: "cards" | "columns") =>
                setFilterType(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cards">Cards</SelectItem>
                <SelectItem value="columns">Columns</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value: "dueDate" | "createdAt") =>
                setSortBy(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="createdAt">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto h-full flex-nowrap">
              {!isPending &&
                filteredAndSortedColumns?.map((column: any) => (
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided) => (
                      <ColumnCard column={column} provided={provided} />
                    )}
                  </Droppable>
                ))}
              <AddColumn />
            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
