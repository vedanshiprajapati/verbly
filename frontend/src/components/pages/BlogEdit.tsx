import { useEffect, useState } from "react";
import BlogEditor from "../Reusables/BlogEditor";
import { Button } from "../ui/button";
import { Value } from "@udecode/plate-common";
import { BACKEND_URL, token } from "@/constants/const";
import { createBlog } from "@vedanshi/verbly-common";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

export default function BlogEdit() {
  const [blog, setBlog] = useState<createBlog>({
    title: "dummy title",
    content: "",
  });
  const Navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [content, setContent] = useState<Value>([]);
  const [shouldPublish, setShouldPublish] = useState(false);
  useEffect(() => {}, [disabled]);
  useEffect(() => {
    if (shouldPublish) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        content: JSON.stringify(content),
      }));
      setShouldPublish(false);
    }
  }, [content, shouldPublish]);

  useEffect(() => {
    if (shouldPublish === false && blog.content) {
      publishBlog(blog);
    }
  }, [blog, shouldPublish]);

  const handleSubmit = () => {
    setDisabled(true);
    setShouldPublish(true);
    setDisabled(false);
  };
  const publishBlog = async (blogInfo: createBlog) => {
    const response = await fetch(`${BACKEND_URL}blog/edit`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogInfo),
    });
    const data = await response.json();
    Navigate(`/blog/${data?.details?.id}`);
  };

  return (
    <>
      <div className="border-b border-black mx-24 mt-12">
        <Input
          onChange={(value) => {
            setBlog({ ...blog, title: value.target.value });
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
        <Button onClick={handleSubmit} disabled={disabled}>
          Publish
        </Button>
      </div>
    </>
  );
}
