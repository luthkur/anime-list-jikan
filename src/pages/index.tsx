import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchAnimesSearch } from "@/hooks/useAnimesSearch";
import AnimeCard from "@/components/AnimeCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["animesSearch"],
    queryFn: () => fetchAnimesSearch(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home({}) {
  const { data, error } = useQuery({
    queryKey: ["animesSearch"],
    queryFn: () => fetchAnimesSearch(),
  });

  let AnimeList = <div>List is Loading</div>;
  let PaginationElement = <div></div>;

  if (data) {
    AnimeList = data.data.map((anime) => {
      return <AnimeCard anime={anime} key={anime.mal_id}></AnimeCard>;
    });
    PaginationElement = (
      <Pagination>
        <PaginationContent>
          {data.pagination.current_page > 1 && (
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {data.pagination.last_visible_page && (
            <PaginationItem>
              <PaginationLink href="#">
                {data.pagination.last_visible_page}
              </PaginationLink>
            </PaginationItem>
          )}
          {data.pagination.has_next_page && (
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  }

  if (error) {
    AnimeList = <span>Error</span>;
  }

  return (
    <div className="flex flex-col m-10">
      <main className="flex flex-col m-10">
        <div className="flex flex-wrap gap-8 justify-center items-center ">
          {AnimeList}
        </div>
        {PaginationElement}
        <div>{data && JSON.stringify(data.pagination)}</div>
      </main>
    </div>
  );
}
