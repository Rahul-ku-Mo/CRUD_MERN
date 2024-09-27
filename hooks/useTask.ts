"use client";

import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useTaskActions = () => {
  const accessToken = Cookies.get("accessToken");

  const createTask = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
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

  const editTask = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${data.id}`,
        {
          method: "PUT",
          credentials: "include",
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

  return { createTask, deleteTask, editTask };
};
