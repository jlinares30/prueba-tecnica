import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiMutation from "../../api/inventoryApi";

export const useInventory = (characterId) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (item) => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const res = await apiMutation.post("/posts", item);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiMutation.delete(`/posts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await apiMutation.put(`/posts/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  return {
    createNote: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateNote: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteNote: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending, 
  };

}