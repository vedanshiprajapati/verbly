import { useState } from "react";
import BlogEditor from "../Reusables/BlogEditor";
import { Button } from "../ui/button";
import { Value } from "@udecode/plate-common";
import { createBlog } from "@vedanshi/verbly-common";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostIndividualBlog } from "@/api/blog";

export default function BlogEdit() {
  const navigate = useNavigate();
  const [content, setContent] = useState<Value>([]);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const postBlogMutation = useMutation({
    mutationFn: PostIndividualBlog,
    onSuccess: (data) => {
      queryClient.setQueryData(["blog", data?.details?.id], data);
      navigate(`/blog/${data?.details?.id}`);
    },
  });

  const handleSubmit = () => {
    const BlogInfo: createBlog = {
      title,
      content: JSON.stringify(content),
      author: {
        username: localStorage.getItem("user") || "",
      },
    };

    postBlogMutation.mutate(BlogInfo);
  };

  return (
    // blog edit page
    <>
      <div className="border-b border-black mx-4 sm:mx-8 md:mx-16 lg:mx-24 mt-6 sm:mt-8 md:mt-12">
        <Input
          onChange={(value) => {
            setTitle(value.target.value);
          }}
          className="h-10 sm:h-12 text-xl sm:text-2xl font-bold w-full"
          placeholder="Title"
        />
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 w-full">
        <BlogEditor
          content={content}
          setContent={setContent}
          readonly={false}
        />
        <Button
          onClick={handleSubmit}
          disabled={
            postBlogMutation.isPending || !title || content.length === 0
          }
          className="z-20 w-full sm:w-auto"
        >
          {postBlogMutation.isPending ? "Publishing..." : "publish"}
        </Button>
      </div>
    </>
  );
}
