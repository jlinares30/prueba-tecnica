import { useQuery } from "@tanstack/react-query";
import api from "../../api/rickMortyApi";

export const useCharacterDetail = (characterId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["character", characterId],
    queryFn: async () => {

      await new Promise(resolve => setTimeout(resolve, 2000));

      const res = await api.get(`/character/${characterId}`); 
      //console.log("Respuesta de la API:", res.data);
      if (res.data) {
        return res.data;
      }
      
      return []; 
    },
  });
  return { data, isLoading, error };
};