import { fetchAnimeById } from "@/hooks/useAnimeDetailsById";
import { fetchAnimesSearch } from "@/hooks/useAnimesSearch";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

// TODO : add anime fetching in get server side prop, clientside fetching display all the data in the pages for making sure the fetching works.
export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [`anime-detail-${id}`],
    queryFn: () => fetchAnimeById(id),
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
  const { data, error } = useQuery({
    queryKey: [`anime-detail-${id}`],
    queryFn: () => fetchAnimeById(id),
  });

  let AnimeDetail = <div>List is Loading</div>;
  console.log(data);
  if (data) {
    AnimeDetail = <div>{data.data.title}</div>;
  }
  return <div>{AnimeDetail}</div>;
};
export default Anime;
