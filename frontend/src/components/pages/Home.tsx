import { useContext, useEffect } from "react";
import Blogcard, { BlogCardSkeleton } from "../Reusables/Blogcard";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "@/api/blog";
import { SparklesCore } from "../ui/sparkles";
import { useTheme } from "../context/ThemeProvider";

export interface BlogDetails {
  title: string;
  content: string;
  id: string;
  author: {
    username: string;
    name?: string;
  };
  link?: string;
  snippet?: string;
  published: true;
}

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <HomepageUnauthenticated />;
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["blog"],
    queryFn: fetchAllBlogs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 200 ||
      isFetchingNextPage
    )
      return;
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (status === "error") {
    return <p>{error.message}</p>;
  }
  const data2: BlogDetails[] =
    data?.pages?.flatMap((page) => page.details) || [];
  return (
    <>
      <div className="flex flex-col items-center mt-8 sm:mt-16">
        <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          {status === "pending" && <BlogCardSkeleton />}
          {data2?.map((item, index) => {
            return <Blogcard BlogDetails={item} key={index} />;
          })}
          {isFetchingNextPage && (
            <div>
              <BlogCardSkeleton />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function HomepageUnauthenticated() {
  const theme = useTheme();
  return (
    <>
      <div className="h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor={theme.theme === "dark" ? "#FFFFFF" : "#021129"}
          />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div>
            <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center  relative z-20">
              Welcome to Verbly
            </h1>
            <div className="w-[40rem] relative mt-2">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
            </div>
          </div>
          <div className="flex mt-7 space-x-4 ">
            <Button className="z-20">
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
            <Button variant={"link"} className="z-20">
              <Link to={"/login"}> Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
