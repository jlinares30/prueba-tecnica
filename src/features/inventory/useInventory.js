import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiMutation from "../../api/inventoryApi";

export const useInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item) => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const res = await apiMutation.post("/posts", item);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
};