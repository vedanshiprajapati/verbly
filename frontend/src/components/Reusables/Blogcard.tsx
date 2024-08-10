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
import { FollowerPointerCard } from "../ui/following-pointer";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
    return text.substring(0, maxLength).trim() + "...";
  }
  const fullText = extractTextContent(content);
  const previewText = createPreview(fullText);

  return (
    <>
      <Link to={`/blog/${BlogDetails?.id}`}>
        {/* <FollowerPointerCard
          title={<TitleComponent title={BlogDetails?.author?.username} />}
        > */}
        <Card
          className="mx-auto border-b-2 outline-2 dark:hover:bg-slate-800 hover:bg-stone-200 w-full transition-all duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <CardHeader className="pb-2 mb-2">
            <CardTitle className="text-base sm:text-lg md:text-xl font-bold uppercase">
              {BlogDetails?.title}
            </CardTitle>
            <div
              className={`h-[2px] ${
                !isHovering ? "w-8" : "w-2/3"
              } transition-all duration-300 bg-black dark:bg-white`}
            ></div>
          </CardHeader>
          <CardContent className="mb-2">
            <p className="text-gray-600 text-muted-foreground line-clamp-2 text-xs sm:text-sm">
              {previewText}
            </p>
          </CardContent>
          <CardFooter className="mt-2 text-right">
            <p className="text-primary font-semibold hover:underline text-xs sm:text-sm">
              Read More
            </p>
          </CardFooter>
        </Card>
        {/* </FollowerPointerCard> */}
      </Link>
    </>
  );
};

// this is for following pointer
function TitleComponent({ title }: { title: string }) {
  return (
    <>
      <div className="flex space-x-2 items-center bg-stone-800 dark:bg-slate-600 rounded-full px-3 py-2">
        <Avatar className="w-6 h-6 text-[10px]">
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
        <p>{title}</p>
      </div>
    </>
  );
}
export function BlogCardSkeleton() {
  return (
    <Card className="w-[48rem] ">
      <CardContent className="grid gap-4 p-6 md:w-[48rem] w-[20rem]">
        <div className="space-y-2 max-w-2xl">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {/* <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div> */}
          <Skeleton className="h-4 md:w-24 w-18" />
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
