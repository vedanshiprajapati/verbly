import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { BlogDetails } from "../pages/Home";

interface BlogcardProps {
  BlogDetails: BlogDetails;
}

const Blogcard: React.FC<BlogcardProps> = ({ BlogDetails }) => {
  const [isHovering, setIsHovering] = useState(false);
  const content = JSON.parse(BlogDetails?.content);
  function extractTextContent(plateContent: any) {
    let textContent = "";

    function traverse(node: any) {
      if (typeof node === "string") {
        textContent += node;
      } else if (Array.isArray(node)) {
        node.forEach(traverse);
      } else if (node && typeof node === "object") {
        if (node.text) {
          textContent += node.text;
        }
        if (node.children) {
          traverse(node.children);
        }
      }
    }

    traverse(plateContent);
    return textContent.trim();
  }

  function createPreview(text: string, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  }
  const fullText = extractTextContent(content);
  const previewText = createPreview(fullText);

  return (
    <>
      <Link to={`/blog/${BlogDetails?.id}`}>
        <Card
          className=" mx-auto border-b-2 outline-2 dark:hover:bg-slate-800 hover:bg-slate-100"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <CardHeader className="pb-2 mb-2">
            <CardTitle className="text-lg font-bold uppercase ">
              {BlogDetails?.title}
            </CardTitle>
            <div
              className={`h-[2px] ${
                !isHovering && "w-8"
              } transition-all duration-300 bg-black dark:bg-white ${
                isHovering && "w-2/3"
              }`}
            ></div>
          </CardHeader>
          <CardContent className="mb-2">
            <p className="text-gray-600 text-muted-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap-">
              {previewText}
            </p>
          </CardContent>
          <CardFooter className="mt-2 text-right">
            <p className="text-primary font-semibold hover:underline">
              Read More
            </p>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export function BlogCardSkeleton() {
  return (
    <Card className="w-[48rem] ">
      <CardContent className="grid gap-4 p-6 w-[48rem]">
        <div className="space-y-2 max-w-2xl">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {/* <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div> */}
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
export default Blogcard;

export function OldBlogcard() {
  return (
    <>
      {/* <Card className="w-[48rem] hover:bg-slate-100 dark:hover:bg-slate-800">
          <CardContent className="grid gap-4 p-6 w-[48rem]  ">
            <div className="space-y-2  max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight">
                {BlogDetails?.title}
              </h2>
              <p className="text-muted-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {BlogDetails?.content}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground  ">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="John Doe"
                  />
                  <AvatarFallback>
                    {BlogDetails?.author?.username[0]}
                  </AvatarFallback>
                </Avatar>
                <span>{BlogDetails?.author?.username}</span>
              </div>
              <span>June 22, 2024</span>
            </div>
          </CardContent>
        </Card> */}
    </>
  );
}
