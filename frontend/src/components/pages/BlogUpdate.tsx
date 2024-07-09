import { BACKEND_URL, token } from "@/constants/const";
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

export default function BlogUpdate() {
  const { id } = useParams();
  if (!id) {
    return <NotFound />;
  }
  const Navigate = useNavigate();
  const [content, setContent] = useState<Value>([]);
  const [title, setTitle] = useState("");

  const individualBlogQuery = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchIndividualBlogs(id),
    enabled: !!id,
  });

  if (individualBlogQuery.isLoading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (individualBlogQuery.isSuccess) {
      setTitle(individualBlogQuery.data.details.title);
      setContent(JSON.parse(individualBlogQuery.data.details.content));
    }
  }, [individualBlogQuery.isSuccess, individualBlogQuery.data]);

  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation({
    mutationFn: UpdateIndividualBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.setQueryData(["blog", data?.details?.id], data);
      Navigate(`/blog/${data?.details?.id}`);
    },
  });

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
    <>
      <div className="border-b border-black mx-24 mt-12">
        <Input
          onChange={(value) => {
            setTitle(value.target.value);
          }}
          defaultValue={title}
          className="border-none h-12 text-2xl font-bold"
          placeholder="Title"
        />
      </div>
      <div className="px-24 py-12 flex flex-col items-center gap-10 w-full">
        {content.length > 0 && (
          <BlogEditor
            content={content}
            setContent={setContent}
            readonly={false}
            initialValue={content}
          />
        )}
        <div className="flex justify-between w-full">
          <Button
            variant={"outline"}
            onClick={() => {
              Navigate(`/blog/${id}`);
            }}
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
          >
            {updateBlogMutation.isPending ? "publishing..." : "publish"}
          </Button>
        </div>
      </div>
    </>
  );
}
