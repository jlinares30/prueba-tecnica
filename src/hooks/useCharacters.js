import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useCharacters = (searchList = "", page = 1) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["characters", searchList, page],
    queryFn: async () => {
      const res = await api.get(`/character`,{
        params: {
          name: searchList,
          page: page
        }
      }
      ); 
      console.log("Respuesta de la API:", res.data);
      if (res.data && res.data.results) {
        return res.data;
      }
      
      return []; 
    },
    keepPreviousData: true,
  });
  return { data, isLoading, error };
};