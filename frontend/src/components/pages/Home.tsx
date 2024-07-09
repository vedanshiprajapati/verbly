import { useContext } from "react";
import Blogcard, { BlogCardSkeleton } from "../Reusables/Blogcard";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "@/api/blog";

export interface BlogDetails {
  title: string;
  content: string;
  id: string;
  author: {
    username: string;
    name?: string;
  };
  published: true;
}

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <HomepageUnauthenticated />;
  }
  const AllBlogsQuery = useQuery({
    queryKey: ["allBlogs"],
    queryFn: fetchAllBlogs,
  });

  const data: BlogDetails[] = AllBlogsQuery.isSuccess && AllBlogsQuery.data;
  return (
    <>
      <div className="flex flex-col items-center mt-16 gap-3">
        {AllBlogsQuery.isLoading ? (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        ) : (
          data?.map((item, index) => {
            return <Blogcard BlogDetails={item} key={index} />;
          })
        )}
      </div>
    </>
  );
}

function HomepageUnauthenticated() {
  return (
    <>
      <div className="flex flex-col items-center justify-end h-1/2">
        <h1 className="text-4xl font-bold mb-6">Welcome to Verbly</h1>
        <div className="flex space-x-4">
          <Button>
            <Link to={`/login`}> Sign In</Link>
          </Button>
          <Button variant={"link"}>
            <Link to={"/signup"}> Sign Up</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
