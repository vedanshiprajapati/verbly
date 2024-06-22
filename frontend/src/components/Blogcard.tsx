import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BlogDetails {
    title: string;
    content: string;
}

interface BlogcardProps {
    BlogDetails: BlogDetails;
}

const Blogcard: React.FC<BlogcardProps> = ({ BlogDetails }) => {
  
    return (
    <Card className="">
      <CardContent className="grid gap-4 p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
           {BlogDetails?.title}
          </h2>
          <p className="text-muted-foreground">
            {BlogDetails?.content}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
          <span>June 22, 2024</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Blogcard;