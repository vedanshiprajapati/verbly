import { DeleteBlog } from "@/api/blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eraser } from "lucide-react";

export function DeletePopOver({
  id,
  disabled,
  setDisabled,
  mobileView,
}: {
  id: string;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  mobileView: boolean;
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => DeleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      setDisabled(true);
    },
  });

  if (deleteMutation.isPending) {
    setDisabled(true);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {mobileView ? (
          <button disabled={disabled} className="flex items-center">
            <Eraser className="w-4 h-4 mr-2" /> Delete
          </button>
        ) : (
          <Button variant="outline" disabled={disabled}>
            <Eraser className="w-4 h-4 mr-2" /> Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Blog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteMutation.mutate()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
