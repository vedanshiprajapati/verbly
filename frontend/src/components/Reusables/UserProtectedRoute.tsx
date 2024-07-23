import { GetIsEditable } from "@/api/blog";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import NotEditable from "../pages/NotEditable";
import { BlogPostSkeleton } from "../pages/Blog";
import NotFound from "../pages/NotFound";

const UserProtectedRoute = () => {
  const { id } = useParams();

  const isEditableQuery = useQuery({
    queryKey: ["isEditable", id],
    queryFn: () => GetIsEditable(id || ""),
    enabled: !!id, // Only run the query if id exists
  });

  if (!id) {
    return <NotFound />;
  }

  if (isEditableQuery.isLoading) {
    return <BlogPostSkeleton />;
  }

  const isEditable =
    isEditableQuery.isSuccess && isEditableQuery.data.isEditable;

  if (isEditable) {
    return <Outlet />;
  } else {
    return <NotEditable />;
  }
};

export default UserProtectedRoute;
