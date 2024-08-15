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
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ReadingTime } from "@/constants/const";
interface BlogcardProps {
  BlogDetails: BlogDetails;
  Global?: boolean;
}
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
const Blogcard: React.FC<BlogcardProps> = ({ BlogDetails, Global = false }) => {
  const [isHovering, setIsHovering] = useState(false);

  let fullText, previewText, content, stats;
  if (!Global) {
    content = JSON.parse(BlogDetails?.content);
    fullText = extractTextContent(content);
    previewText = createPreview(fullText);
    stats = ReadingTime(fullText);
  }

  let link;
  let target;
  if (Global && BlogDetails.link) {
    link = BlogDetails.link;
    target = "_blank";
  } else {
    link = `/blog/${BlogDetails?.id}`;
    target = "";
  }
  return (
    <>
      <Link to={link} target={target}>
        {/* <FollowerPointerCard
          title={<TitleComponent title={BlogDetails?.author?.username} />}
        > */}
        <Card
          className="mx-auto border-b-2 outline-2 dark:hover:bg-slate-800 hover:bg-stone-200 w-full transition-all duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <CardHeader className="pb-2 mb-2">
            <CardTitle className="text-base sm:text-lg md:text-xl line-clamp-1 md:line-clamp-none font-bold uppercase">
              {BlogDetails?.title}
            </CardTitle>
            <div
              className={`h-[2px] ${
                !isHovering ? "w-8" : "w-2/3"
              } transition-all duration-300 bg-black dark:bg-white`}
            ></div>
          </CardHeader>
          <CardContent className="mb-2">
            <p className="text-gray-600 text-muted-foreground line-clamp-1 text-xs sm:text-sm">
              {previewText || BlogDetails?.snippet}
            </p>
          </CardContent>
          <CardFooter className="text-right flex justify-between">
            {!Global && (
              <>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {BlogDetails?.author?.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span>{BlogDetails?.author?.username}</span>
                </div>
                <p className="text-primary font-semibold text-xs sm:text-sm">
                  {stats?.text}
                </p>
              </>
            )}
            {Global && <Badge>Global</Badge>}
          </CardFooter>
        </Card>
        {/* </FollowerPointerCard> */}
      </Link>
    </>
  );
};

// this is for following pointer

// function TitleComponent({ title }: { title: string }) {
//   return (
//     <>
//       <div className="flex space-x-2 items-center bg-stone-800 dark:bg-slate-600 rounded-full px-3 py-2">
//         <Avatar className="w-6 h-6 text-[10px]">
//           <AvatarFallback>{title[0]}</AvatarFallback>
//         </Avatar>
//         <p>{title}</p>
//       </div>
//     </>
//   );
// }
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
      {/*  <Card className="w-[48rem] hover:bg-slate-100 dark:hover:bg-slate-800">
          <CardContent className="grid gap-4 p-6 w-[48rem]  ">
            <div className="space-y-2  max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight">
                {BlogDetails?.title}
              </h2>
              <p className="text-muted-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {previewText || BlogDetails?.snippet}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground  ">
              <div className="flex items-center gap-2">
                <Avatar>
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

// new component which has no author name on card
// <Card
//           className="mx-auto border-b-2 outline-2 dark:hover:bg-slate-800 hover:bg-stone-200 w-full transition-all duration-300"
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           <CardHeader className="pb-2 mb-2">
//             <CardTitle className="text-base sm:text-lg md:text-xl font-bold uppercase">
//               {BlogDetails?.title}
//             </CardTitle>
//             <div
//               className={`h-[2px] ${
//                 !isHovering ? "w-8" : "w-2/3"
//               } transition-all duration-300 bg-black dark:bg-white`}
//             ></div>
//           </CardHeader>
//           <CardContent className="mb-2">
//             <p className="text-gray-600 text-muted-foreground line-clamp-2 text-xs sm:text-sm">
//               {previewText || BlogDetails?.snippet}
//             </p>
//           </CardContent>
//           <CardFooter className="mt-2 text-right flex justify-between">
//             <p className="text-primary font-semibold hover:underline text-xs sm:text-sm">
//               Read More
//             </p>
//             {Global && <Badge>Global</Badge>}
//           </CardFooter>
//         </Card>
