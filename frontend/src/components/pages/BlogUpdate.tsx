import { BACKEND_URL, token } from "@/constants/const";
import BlogEditor from "../Reusables/BlogEditor";
import { Input } from "../plate-ui/input";
import { Button } from "../ui/button";
import { createBlog } from "@vedanshi/verbly-common";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Value } from "@udecode/plate-common";
import { fetchIndividualBlogs } from "@/api/blog";

export default function BlogUpdate() {
  const { id } = useParams();
  const [blog, setBlog] = useState<createBlog>({
    title: "",
    content: "",
    author: {
      username: "",
    },
  });
  const Navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [content, setContent] = useState<Value>([]);
  const [shouldPublish, setShouldPublish] = useState(false);
  const fetchIndividualBlog = async () => {
    const data = await fetchIndividualBlogs(id);
    console.log(data);
    setBlog(data?.details);
    setContent(JSON.parse(data?.details?.content));
  };
  useEffect(() => {
    fetchIndividualBlog();
  }, []);
  useEffect(() => {}, [disabled]);
  useEffect(() => {
    if (shouldPublish) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        content: JSON.stringify(content),
      }));
    }
  }, [content, shouldPublish]);

  useEffect(() => {
    if (shouldPublish === true && blog.content) {
      publishBlog(blog);
    }
  }, [blog, shouldPublish]);

  const handleSubmit = () => {
    setDisabled(true);
    setShouldPublish(true);
    setDisabled(false);
  };
  const publishBlog = async (blogInfo: createBlog) => {
    const response = await fetch(`${BACKEND_URL}blog/${id}`, {
      method: "PUT",
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
          defaultValue={blog.title}
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
          <Button onClick={handleSubmit} disabled={disabled}>
            Publish
          </Button>
        </div>
      </div>
    </>
  );
}
