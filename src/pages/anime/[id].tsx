import { fetchAnimeById } from "@/hooks/useAnimeDetailsById";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [`anime-detail-${id}`],
    queryFn: () => fetchAnimeById(parseInt(id as string)),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Anime = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery({
    queryKey: [`anime-detail-${id}`],
    queryFn: () => fetchAnimeById(parseInt(id as string)),
  });

  let AnimeDetail = <div>List is Loading</div>;
  if (data) {
    const { data: anime } = data;
    AnimeDetail = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Card>
            <CardHeader className="w-40">
              <CardTitle>{anime.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardDescription className="h-[220px] w-[160px] relative">
                <Image
                  src={anime.images.webp.large_image_url}
                  alt={anime.title}
                  sizes="100%"
                  fill
                  unoptimized
                />
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="w-40">
              <CardTitle>Statistic</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardDescription>
                <div className="grid grid-cols-3">
                  <span>Score : {anime.score}</span>
                  <span>Rank : {anime.rank}</span>
                  <span>Members: {anime.members}</span>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="w-40">
              <CardTitle>Synopsis</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardDescription>
                <p>{anime.synopsis}</p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="w-96">
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardDescription></CardDescription>
              <div className="flex flex-col gap-1">
                <span>Type: {anime.type}</span>
                <span>Episodes: {anime.episodes}</span>
                <span>Status: {anime.status}</span>
                <span>
                  Aired: {anime.aired.from} to {anime.aired.to}
                </span>
                <span>
                  Premiered: {anime.season} {anime.year}
                </span>
                <span>
                  Broadcast: {anime.broadcast.day} at {anime.broadcast.time} (
                  {anime.broadcast.timezone})
                </span>
                <span>
                  Producers:{" "}
                  {anime.producers.map((producer) => producer.name).join(", ")}
                </span>
                <span>Sonilude, Netmarble, Kakao piccoma, D&C Media</span>
                <span>found, add some</span>
                <span>Studios: A-1 Pictures</span>
                <span>Source: Web manga</span>
                <span>Genres:</span>
                <span>Action, Adventure, Fantasy</span>
                <span>Themes: Adult Cast, Urban Fantasy</span>
                <span>Duration: 23 min. per ep.</span>
                <span>Rating: R - 17+ (violence & profanity)</span>
                <span>Score : {anime.score}</span>
                <span>Rank : {anime.rank}</span>
                <span>Members: {anime.members}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          Character & Voice Actors
          <Card>
            <CardHeader className="w-40">
              <CardTitle>{anime.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardDescription className="h-[220px] w-[160px] relative">
                <Image
                  src={anime.images.webp.large_image_url}
                  alt={anime.title}
                  sizes="100%"
                  fill
                  unoptimized
                />
              </CardDescription>
              <div className="grid grid-cols-3">
                <span>Score : {anime.score}</span>
                <span>Rank : {anime.rank}</span>
                <span>Members: {anime.members}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return <div className="flex flex-col m-10">{AnimeDetail}</div>;
};
export default Anime;
