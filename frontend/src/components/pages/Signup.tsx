import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signup, signupInput } from "@vedanshi/verbly-common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function Signup() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<signup>({ resolver: zodResolver(signupInput) });
  const Navigate = useNavigate();
  const { signUp, isSignUpPending } = useContext(AuthContext);

  const handleSubmit2: SubmitHandler<FieldValues> = (data) => {
    const userInputs = data as signup;
    console.log(userInputs);
    signUp(userInputs);
    console.log("function pura hua");
    reset();
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign up!</CardTitle>
            <CardDescription>
              Welcome on verbly🚀! please enter your details to make your
              account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmit2)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name (optional)"
                    className="h-10"
                    {...register("name")}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    className="h-10"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      valid email is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="h-10"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs">
                      valid username is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    className="h-10"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      valid password is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    Navigate(`/`);
                  }}
                >
                  <MoveLeft className="w-4 h-4 mr-1" />
                  Home
                </Button>
                <Button type="submit" disabled={isLoading || isSignUpPending}>
                  Sign up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
