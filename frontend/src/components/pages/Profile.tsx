import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpenIcon, UserIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetProfile } from "@/api/user";
import Blogcard from "../Reusables/Blogcard";
import { Skeleton } from "../ui/skeleton";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("posts");
  const [isUserProfile, setIsUserProfile] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    if (username === localStorage.getItem("user")) {
      setIsUserProfile(true);
    }
  }, [username]);

  const profileQuery = useQuery({
    queryKey: ["profile", username],
    queryFn: () => {
      if (!username) {
        throw new Error("Username is undefined");
      }
      return GetProfile(username);
    },
    enabled: !!username,
  });

  if (!username) {
    return <div>user doesn't exist</div>;
  }

  let user = profileQuery.isSuccess && profileQuery.data.details;
  // if (profileQuery.isFetching) {
  //   return <ProfileSkeleton />;
  // }
  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
        <Avatar className="w-32 h-32 mb-4 md:mb-0 md:mr-8">
          <AvatarFallback className="text-6xl">
            {(user?.name || user?.username)[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">
            {user?.name || user?.username}
          </h1>
          <p className="text-gray-600 mb-2">@{user?.username}</p>
          <p className="text-gray-700 mb-4">{user?.email}</p>
          {isUserProfile && <Button variant="outline">Edit Profile</Button>}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeSection === "posts" ? "default" : "outline"}
            onClick={() => setActiveSection("posts")}
          >
            <BookOpenIcon className="mr-2 h-4 w-4" /> Posts
          </Button>
          <Button
            variant={activeSection === "about" ? "default" : "outline"}
            onClick={() => setActiveSection("about")}
          >
            <UserIcon className="mr-2 h-4 w-4" /> About
          </Button>
        </div>

        {activeSection === "posts" && (
          <div className="space-y-4 flex flex-col">
            {user?.posts.map((post: any) => (
              <Blogcard BlogDetails={post} key={post.id} />
            ))}
          </div>
        )}

        {activeSection === "about" && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                About {user.name || user.username}
              </h2>
              <p className="text-gray-700">User ID: {user.id}</p>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Username: {user.username}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
        <Skeleton className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8" />
        <div className="text-center md:text-left">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-40 mb-4" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <Button variant="outline" disabled>
            <Skeleton className="h-4 w-4 mr-2" /> Posts
          </Button>
          <Button variant="outline" disabled>
            <Skeleton className="h-4 w-4 mr-2" /> About
          </Button>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
