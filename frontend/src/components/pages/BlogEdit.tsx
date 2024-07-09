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
    console.log(content);
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
    <>
      <div className="border-b border-black mx-24 mt-12">
        <Input
          onChange={(value) => {
            setTitle(value.target.value);
          }}
          className="border-none h-12 text-2xl font-bold"
          placeholder="Title"
        />
      </div>
      <div className="px-24 py-12 flex flex-col items-center gap-10 w-full">
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
        >
          {postBlogMutation.isPending ? "Publishing..." : "publish"}
        </Button>
      </div>
    </>
  );
}
