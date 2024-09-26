"use client";

import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTask = (columnId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/task`
      );

      return await response.json();
    },
  });

  return { data, isPending };
};

export const useTaskActions = (columnId: string) => {
  const createTask = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/task`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", columnId],
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/task/${id}`,
        {
          method: "DELETE",
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", columnId],
      });
    },
  });

  const editTask = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/task/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", columnId],
      });
    },
  });

  return { createTask, deleteTask, editTask };
};
