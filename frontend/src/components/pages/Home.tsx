import { useContext, useEffect, useState } from "react";
import Blogcard, { BlogCardSkeleton } from "../Reusables/Blogcard";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constants/const";
export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let token = JSON.stringify(localStorage.getItem("token"));
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    setIsLoading(true);
    console.log(token);
    const response = await fetch(`${BACKEND_URL}blog/bulk`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setData(data?.details);
    setIsLoading(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col items-center mt-16 gap-3">
          {data?.map((item, index) => {
            return isLoading ? (
              <BlogCardSkeleton />
            ) : (
              <Blogcard BlogDetails={item} key={index} />
            );
          })}
        </div>
      ) : (
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
      )}
    </>
  );
}
