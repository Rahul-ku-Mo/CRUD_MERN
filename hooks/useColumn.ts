"use client";

import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useColumn = () => {
  const { data, isPending } = useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const accessToken = Cookies.get("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/columns`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return await response.json();
    },
  });

  return { data, isPending };
};

export const useColumnActions = () => {
  const accessToken = Cookies.get("accessToken");

  const createColumn = useMutation({
    mutationFn: async (data: { name: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/columns`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });

  const deleteColumn = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/columns/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });

  const editColumn = useMutation({
    mutationFn: async (data: { id: string; name: string; order: number }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/columns/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: data.name, order: data.order }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });

  const updateTaskOrder = useMutation({
    mutationFn: async (data: {
      destinationColumnId: string;
      destinationTasks: any;
      sourceColumnId: string;
      sourceTasks: any;
    }) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/columns/orderTasks`, {
        method: "PUT",
        body: JSON.stringify({
          destinationColumnId: data.destinationColumnId,
          destinationTasks: data.destinationTasks,
          sourceColumnId: data.sourceColumnId,
          sourceTasks: data.sourceTasks,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  });

  return { createColumn, deleteColumn, editColumn, updateTaskOrder };
};
