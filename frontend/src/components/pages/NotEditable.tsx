import React from "react";
import { Shield, ArrowLeft, Home } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NoteEditable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h- h-5/6 p-4">
      <Card className="max-w-md w-full shadow-lg rounded-lg dark:shadow-stone-900">
        <CardHeader className="text-center">
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold ">Access Denied</CardTitle>
          <CardDescription className="">
            Oops! It looks like you don't have permission to edit this blog
            post.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="">This could be because:</p>
          <ul className="list-disc list-inside  mt-2">
            <li>You're not the owner of this blog post</li>
            <li>You're not logged in</li>
            <li>There might be a temporary issue with permissions</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button onClick={() => navigate("/")} className="flex items-center">
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoteEditable;
