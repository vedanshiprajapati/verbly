import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "@/api/user";

interface EditProfileModalProps {
  currentUser: {
    name: string;
    email: string;
    username: string;
  };
}

interface FormData {
  name: string;
  email: string;
  username: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: UpdateProfile,
    onSuccess: (data, variable) => {
      console.log(data, "=data and variable= ", variable);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      username: currentUser.username,
    },
  });

  const handler = (data: FormData) => {
    updateMutation.mutate(data);
    console.log(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px] p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handler)}
          className="space-y-4 sm:space-y-6 mt-4"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
                className="w-full"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div> */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4 sm:mt-6">
            <Button type="submit" disabled={updateMutation.isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
