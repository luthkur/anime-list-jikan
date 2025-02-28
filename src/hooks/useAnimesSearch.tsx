import { useQuery } from "@tanstack/react-query";

import { AnimeData } from "../types";

const fetchAnimesSearch = async (limit = 10): Promise<AnimeData> => {
  const response = await fetch("https://api.jikan.moe/v4/anime");
  const data = await response.json();
  return data;
};

const useAnimesSearch = (limit: number) => {
  return useQuery({
    queryKey: ["animesSearch", limit],
    queryFn: () => fetchAnimesSearch(limit),
  });
};

export { useAnimesSearch, fetchAnimesSearch };
