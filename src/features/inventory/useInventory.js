import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiMutation from "../../api/inventoryApi";

export const useInventory = (characterId) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (item) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const res = await apiMutation.post("/posts", item);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", characterId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiMutation.delete(`/posts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", characterId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const res = await apiMutation.put(`/posts/${id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", characterId] });
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