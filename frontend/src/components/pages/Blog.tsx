import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import BlogEditor from "../Reusables/BlogEditor";
import { Button } from "../ui/button";
import { EllipsisVertical, Pencil } from "lucide-react";
import { fetchIndividualBlogs } from "@/api/blog";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { DeletePopOver } from "../Reusables/DeletePopOver";
import NotFound from "./NotFound";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Blog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  if (!id) {
    return <NotFound />;
  }
  const individualBlogQuery = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchIndividualBlogs(id),
  });

  const data =
    individualBlogQuery.isSuccess && individualBlogQuery.data.details;

  if (individualBlogQuery.isLoading) {
    return <BlogPostSkeleton />;
  }
  if (!data) {
    return <NotFound />;
  }
  const Options = () => {
    return (
      <div className="hidden sm:flex sm:flex-col gap-1">
        {user === data?.author?.username && (
          <>
            <Button
              className=""
              variant={"outline"}
              onClick={() => {
                navigate(`/blog/${id}/edit`);
              }}
              disabled={disabled}
            >
              <Pencil className="mr-2 h-3 w-3" /> Edit
            </Button>
            <DeletePopOver
              mobileView={false}
              id={id}
              disabled={disabled}
              setDisabled={setDisabled}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <main className="md:w-2/3 w-full container mx-auto px-2 sm:px-4 py-10">
          <div className="p-2 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="w-full">
                <h2 className="text-2xl sm:text-3xl font-bold ">
                  {data?.title}
                </h2>
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/@${data?.author?.username}`}>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {data?.author?.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm ">
                        <p>{data?.author?.username}</p>
                      </div>
                    </div>
                  </Link>
                  {user === data?.author?.username && (
                    <div className="block sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <EllipsisVertical className="w-6 h-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <button
                              className="flex items-center"
                              onClick={() => {
                                navigate(`/blog/${id}/edit`);
                              }}
                              disabled={disabled}
                            >
                              <Pencil className="mr-2 h-3 w-3" /> Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DeletePopOver
                              mobileView={true}
                              id={id}
                              disabled={disabled}
                              setDisabled={setDisabled}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
              <Options />
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

export function BlogPostSkeleton() {
  return (
    <div className="flex justify-center">
      <main className="md:w-2/3 w-full container mx-auto px-2 sm:px-4 py-10">
        <div className="p-2 md:p-6">
          <div className="fflex flex-col sm:flex-row justify-between items-center">
            <div>
              <Skeleton className="h-12 w-50 md:w-64 mb-4" />
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
