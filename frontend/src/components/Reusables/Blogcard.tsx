import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface BlogDetails {
  title: string;
  content: string;
  id: string;
  author: {
    username: string;
    name: string | null;
  };
}

interface BlogcardProps {
  BlogDetails: BlogDetails;
}

const Blogcard: React.FC<BlogcardProps> = ({ BlogDetails }) => {
  return (
    <Link to={`/blog/${BlogDetails?.id}`}>
      <Card className="w-[48rem] hover:bg-slate-100 dark:hover:bg-slate-800">
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
                {/* <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="John Doe"
                /> */}
                <AvatarFallback>
                  {BlogDetails?.author?.username[0]}
                </AvatarFallback>
              </Avatar>
              <span>{BlogDetails?.author?.username}</span>
            </div>
            <span>June 22, 2024</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export function BlogCardSkeleton() {
  return (
    <Card className="w-[48rem] hover:bg-slate-100 dark:hover:bg-slate-800">
      <CardContent className="grid gap-4 p-6 w-[48rem]">
        <div className="space-y-2 max-w-2xl">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
export default Blogcard;
