import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchAnimesSearch, useAnimesSearch } from "@/hooks/useAnimesSearch";
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
import { Input } from "@/components/ui/input";
import { Fragment, JSX, useState } from "react";
import { useRouter } from "next/router";
import { parseAsInteger, useQueryState } from "nuqs";

export const getServerSideProps = async (context) => {
  const query = context.query;
  console.log(query);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["animesSearch"],
    queryFn: () => fetchAnimesSearch(query),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useQueryState("q", {
    // Send updates to the server maximum once every second
    shallow: false,
    throttleMs: 1000,
    defaultValue: "",
  });
  const [searchBar, setSearchBar] = useState(search);

  const { query } = router;
  console.log(query);

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  let totalPages = 0;

  const { data, error } = useAnimesSearch(query);

  let AnimeList: JSX.Element | JSX.Element[] = <div>List is Loading</div>;
  let PaginationElement = <div></div>;

  if (data) {
    AnimeList = data.data.map((anime) => {
      return <AnimeCard anime={anime} key={anime.mal_id}></AnimeCard>;
    });

    totalPages = data.pagination.last_visible_page;

    // Generate an array of page numbers to display
    const getPageNumbers = () => {
      // Always show first page, last page, current page,
      // and 1 page before and after current page
      const pages = new Set([1, totalPages, currentPage]);

      if (currentPage > 1) pages.add(currentPage - 1);
      if (currentPage < totalPages) pages.add(currentPage + 1);

      // Convert to array and sort
      return Array.from(pages).sort((a, b) => a - b);
    };

    const pageNumbers = getPageNumbers();

    // Handle page changes
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    PaginationElement = (
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          )}
          {pageNumbers.map((pageNumber, index) => {
            // Check if we need to insert an ellipsis
            const needsEllipsisBefore =
              index > 0 && pageNumber > pageNumbers[index - 1] + 1;

            return (
              <Fragment key={pageNumber}>
                {needsEllipsisBefore && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              </Fragment>
            );
          })}
          {data.pagination.has_next_page && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  }

  if (error) {
    AnimeList = <span>{error.message}</span>;
  }

  return (
    <div className="flex flex-col m-10 items-center gap-2">
      <div className="flex w-full max-w-sm justify-center items-center space-x-2">
        <Input
          type="search"
          value={searchBar || ""}
          placeholder="Search Anime"
          onChange={(e) => {
            setSearchBar(e.target.value);
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-8 justify-center items-center ">
        {AnimeList}
      </div>
      <div className="text-2xl">{PaginationElement}</div>
    </div>
  );
}
