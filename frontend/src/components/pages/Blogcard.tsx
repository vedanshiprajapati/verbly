import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface BlogDetails {
  title: string;
  content: string;
  id: string;
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
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="John Doe"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </div>
            <span>June 22, 2024</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Blogcard;
