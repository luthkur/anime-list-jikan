import { useQuery } from "@tanstack/react-query";
import { objectToQueryParams } from "@/lib/utils";
import { AnimeData } from "../types";

const fetchAnimesSearch = async (query): Promise<AnimeData> => {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime${objectToQueryParams(query)}`
  );
  const data = await response.json();
  return data;
};

const useAnimesSearch = (query) => {
  return useQuery({
    queryKey: ["animesSearch", query],
    queryFn: () => fetchAnimesSearch(query),
  });
};

export { useAnimesSearch, fetchAnimesSearch };
