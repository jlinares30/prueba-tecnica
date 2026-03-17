import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiMutation from "../lib/apiMutation";

export const useInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item) => {
      const res = await apiMutation.post("/posts", item);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
};