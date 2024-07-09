import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import BlogEditor from "../Reusables/BlogEditor";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { fetchIndividualBlogs } from "@/api/blog";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export default function Blog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const individualBlogQuery = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchIndividualBlogs(id),
  });

  const data =
    individualBlogQuery.isSuccess && individualBlogQuery.data.details;

  if (individualBlogQuery.isLoading) {
    return (
      <>
        <BlogPostSkeleton />
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <main className="w-2/3 container mx-auto px-4 py-10">
          <div className=" p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold ">{data?.title}</h2>
                <div className="flex items-center gap-4 mt-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{data?.author?.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm ">
                    <p>{data?.author?.username}</p>
                  </div>
                </div>
              </div>
              {user === data?.author?.username && (
                <Button
                  className=""
                  variant={"outline"}
                  onClick={() => {
                    navigate(`/blog/${id}/edit`);
                  }}
                >
                  <Pencil className="mr-2 h-3 w-3" /> Edit
                </Button>
              )}
            </div>
            <div className="mt-6 ">
              {data?.content[0] === "[" && (
                <BlogEditor
                  readonly={true}
                  initialValue={JSON.parse(data?.content)}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="flex justify-center">
      <main className="w-2/3 container mx-auto px-4 py-10">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-12 w-64 mb-4" />
              <div className="flex items-center gap-4 mt-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
          </div>
        </div>
      </main>
    </div>
  );
}
