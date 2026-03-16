import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useCharacters = (searchList = "") => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["characters", searchList],
    queryFn: async () => {
      const res = await api.get(`/character?name=${searchList}`); 
      console.log("Respuesta de la API:", res.data);
      if (res.data && res.data.results) {
        return res.data.results;
      }
      
      return []; 
    },
  });
  return { data, isLoading, error };
};