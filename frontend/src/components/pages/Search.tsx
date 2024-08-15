import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { BlogSearch, GlobalBlogSearch } from "@/api/blog";
import { useRef, useState } from "react";
import Blogcard, { BlogCardSkeleton } from "../Reusables/Blogcard";
import { BlogDetails } from "./Home";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Separator } from "../ui/separator";

const SearchPage = () => {
  const [startIndexGlobal, setStartIndexGlobal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [BlogData, setBlogData] = useState<any>({});
  const [GlobalBlogData, setGlobalBlogData] = useState<any>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const searchMutation = useMutation({
    mutationFn: (query: string) => BlogSearch(query),
    onSuccess: (data) => {
      setBlogData(data);
    },
    onError: (error) => {
      console.error("Error fetching blog data:", error);
      setBlogData({ details: [] });
    },
  });
  const searchGlobalMutation = useMutation({
    mutationFn: ({
      query,
      startIndex,
    }: {
      query: string;
      startIndex: number;
    }) => GlobalBlogSearch(query, startIndex),

    onSuccess: (data) => {
      console.log(data);
      setGlobalBlogData(data);
    },
    onError: (error) => {
      console.error("Error fetching global blog data:", error);
      setGlobalBlogData({ details: { items: [] } });
    },
  });

  const handleSearch = async () => {
    setBlogData({});
    setGlobalBlogData({});
    setStartIndexGlobal(0);
    setCurrentPage(1);
    const query = input.trim();
    if (query.trim() !== "") {
      await searchMutation.mutate(query);
      await searchGlobalMutation.mutate({
        query,
        startIndex: startIndexGlobal,
      });
      inputRef?.current?.blur();
    }
  };
  const handleSearchPagination = (newStartIndex: number) => {
    const query = input.trim();
    if (query.trim() !== "") {
      searchGlobalMutation.mutate({ query, startIndex: newStartIndex });
      inputRef?.current?.blur();
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  // https://programmablesearchengine.google.com/controlpanel/overview?cx=f1e1579118ba44d87#programmatic-access-card
  const totalPages = 10;
  const visiblePages = 4;

  const pageNumbers = (() => {
    const halfVisible = Math.floor(visiblePages / 2);
    const start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + visiblePages - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    const newStartIndex = (pageNumber - 1) * 10; // Assuming 10 results per page
    setStartIndexGlobal(newStartIndex);
    setCurrentPage(pageNumber);
    if (input.trim() !== "") {
      if (pageNumber === 1) {
        handleSearch();
      } else {
        handleSearchPagination(newStartIndex);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10 px-4">
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-xl md:text-5xl font-extrabold mb-2">
            <span className="absolute  mx-auto py-4 flex border bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-yellow-400 bg-clip-text text-3xl md:text-6xl box-content font-extrabold text-transparent text-center select-none">
              Global Blog search ✨
            </span>
            <span className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-yellow-400 bg-clip-text text-3xl md:text-6xl font-extrabold text-transparent text-center select-auto">
              Global Blog Search ✨
            </span>
          </h1>
          <p className="text-sm text-slate-300">
            Discover amazing content across the web
          </p>
        </div>

        <div className="w-full max-w-3xl mb-8">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for blogs, articles, tutorials..."
              className="w-full h-14 py-4 pl-6 pr-16 text-lg rounded-full bg-white/10 backdrop-blur-md text-white placeholder-purple-300 border-2 border-blue-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500  transition-all duration-300"
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-700 
            hover:to-teal-700 text-white rounded-full p-2 transition-all duration-300"
              onClick={handleSearch}
            >
              <Search className="w-6 h-6 hover:scale-[0.9]" />
            </Button>
          </div>
        </div>
        {searchMutation.isError && (
          <p>Error fetching local results: {searchMutation.error.message}</p>
        )}
        {searchGlobalMutation.isError && (
          <p>
            Error fetching global results: {searchGlobalMutation.error.message}
          </p>
        )}
        <ScrollArea
          className="h-[600px] rounded-md border p-4 w-full max-w-4xl"
          key={2}
        >
          {searchMutation.isPending &&
            searchGlobalMutation.isPending &&
            !searchGlobalMutation.isSuccess && <BlogCardSkeleton key={1} />}
          {!searchMutation.isPending &&
            searchMutation.isSuccess &&
            (BlogData?.details?.length > 0 ? (
              BlogData.details.map((item: BlogDetails) => (
                <Blogcard BlogDetails={item} key={item.id} />
              ))
            ) : (
              <>
                <p className="text-center">No local results found</p>
                <Separator />
              </>
            ))}
          {!searchGlobalMutation.isPending &&
            searchGlobalMutation.isSuccess &&
            (GlobalBlogData?.details?.items?.length > 0 ? (
              GlobalBlogData.details.items.map((item: BlogDetails) => (
                <Blogcard BlogDetails={item} Global={true} key={item?.title} />
              ))
            ) : (
              <p className="text-center">No global results found</p>
            ))}
        </ScrollArea>
        {input.length > 0 && (BlogData.details || GlobalBlogData.details) && (
          <Pagination className="mt-5 px-2">
            <PaginationContent>
              {startIndexGlobal > 0 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      goToPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
              )}

              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => goToPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => goToPage(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <div className="mt-12 text-purple-200 text-sm">
          Powered by Google - Search across millions of blogs instantly
        </div>
      </div>
    </>
  );
};

export default SearchPage;
