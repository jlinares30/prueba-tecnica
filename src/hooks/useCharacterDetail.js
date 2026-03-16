import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useCharacterDetail = (characterId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["character", characterId],
    queryFn: async () => {
      const res = await api.get(`/character/${characterId}`); 
      console.log("Respuesta de la API:", res.data);
      if (res.data && res.data.results) {
        return res.data.results;
      }
      
      return []; 
    },
  });
  return { data, isLoading, error };
};