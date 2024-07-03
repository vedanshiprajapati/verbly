import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createBlog } from "@vedanshi/verbly-common";
import { BACKEND_URL, token } from "@/constants/const";
import BlogEditor from "../Reusables/BlogEditor";

export default function Blog() {
  const { id } = useParams();
  const [data, setData] = useState<createBlog>({ title: "", content: "" });
  useEffect(() => {
    fetchIndividualBlogs();
  }, []);

  const fetchIndividualBlogs = async () => {
    const response = await fetch(`${BACKEND_URL}blog/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setData(data?.details);
  };
  return (
    <>
      <div className="flex justify-center">
        <main className="w-2/3 container mx-auto px-4 py-10">
          <div className=" p-6">
            <h2 className="text-3xl font-bold ">{data?.title}</h2>
            <div className="flex items-center gap-4 mt-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Jd</AvatarFallback>
              </Avatar>
              <div className="text-sm ">
                <p>john doe</p>
                <p>24 nov 2023</p>
              </div>
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
