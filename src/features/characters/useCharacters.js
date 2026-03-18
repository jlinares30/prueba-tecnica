import { useQuery } from "@tanstack/react-query";
import api from "../../api/rickMortyApi";
import { keepPreviousData } from '@tanstack/react-query';

export const useCharacters = (searchList = "", page = 1) => {
  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["characters", searchList, page],
    queryFn: async () => {

      await new Promise(resolve => setTimeout(resolve, 2000));

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
    placeholderData: keepPreviousData,
  });
  return { data, isLoading, isPlaceholderData, error };
};