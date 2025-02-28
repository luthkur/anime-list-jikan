import { useQuery } from "@tanstack/react-query";

import { AnimeDetailResponse } from "../types";

const fetchAnimeById = async (id): Promise<AnimeDetailResponse> => {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await response.json();
  return data;
};

const useAnimesById = (limit: number) => {
  return useQuery({
    queryKey: [`anime-detail`, limit],
    queryFn: () => fetchAnimeById(limit),
  });
};

export { useAnimesById, fetchAnimeById };
