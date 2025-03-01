import { fetchAnimeById } from "@/hooks/useAnimeDetailsById";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

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
  console.log(data);
  if (data) {
    AnimeDetail = (
      <div className="flex flex-col">
        <div>{data.data.title}</div>
        <div>BreadCrumb</div>
        <div>Statistic Card</div>
        <div>Synopsis section</div>
        <div>Titles Array</div>
        <div>Information Section</div>
        <div>Related Entries</div>
        <div>Character & Voice Actors</div>
      </div>
    );
  }
  return <div className="flex flex-col m-10">{AnimeDetail}</div>;
};
export default Anime;
