import BlogEditor from "../Reusables/BlogEditor";
import { Input } from "../plate-ui/input";
import { Button } from "../ui/button";
import { createBlog } from "@vedanshi/verbly-common";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Value } from "@udecode/plate-common";
import { UpdateIndividualBlog, fetchIndividualBlogs } from "@/api/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotFound from "./NotFound";
import { BlogPostSkeleton } from "./Blog";

export default function BlogUpdate() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [content, setContent] = useState<Value>([]);
  const [title, setTitle] = useState("");

  const individualBlogQuery = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchIndividualBlogs(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation({
    mutationFn: UpdateIndividualBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.setQueryData(["blog", data?.details?.id], data);
      Navigate(`/blog/${data?.details?.id}`);
    },
  });

  useEffect(() => {
    if (individualBlogQuery.isSuccess) {
      setTitle(individualBlogQuery.data.details.title);
      setContent(JSON.parse(individualBlogQuery.data.details.content));
    }
  }, [individualBlogQuery.isSuccess, individualBlogQuery.data]);

  if (!id) {
    return <NotFound />;
  }

  if (individualBlogQuery.isLoading) {
    return <BlogPostSkeleton />;
  }

  const handleSubmit = () => {
    const blogInfo: createBlog = {
      title,
      content: JSON.stringify(content),
      author: {
        username: localStorage.getItem("user") || "",
      },
    };
    updateBlogMutation.mutate({ blogInfo, id });
  };

  return (
    // blog update page
    <>
      <div className="border-b border-black mx-4 sm:mx-8 md:mx-16 lg:mx-24 mt-6 sm:mt-8 md:mt-12">
        <Input
          onChange={(value) => {
            setTitle(value.target.value);
          }}
          defaultValue={title}
          className="border-none h-10 sm:h-12 text-xl sm:text-2xl font-bold w-full"
          placeholder="Title"
        />
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 w-full">
        {content.length > 0 && (
          <BlogEditor
            content={content}
            setContent={setContent}
            readonly={false}
            initialValue={content}
          />
        )}
        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-0">
          <Button
            variant={"outline"}
            onClick={() => {
              Navigate(`/blog/${id}`);
            }}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              updateBlogMutation.isPending ||
              title.length === 0 ||
              content.length === 0
            }
            className="w-full sm:w-auto"
          >
            {updateBlogMutation.isPending ? "publishing..." : "publish"}
          </Button>
        </div>
      </div>
    </>
  );
}
