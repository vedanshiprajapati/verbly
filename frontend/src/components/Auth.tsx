import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { signin, signinInput } from "@vedanshi/verbly-common";

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<signin>({ resolver: zodResolver(signinInput) });
  const handleSubmit2: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Welcome Back! please enter your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmit2)}>
              <div className="grid w-full items-center gap-4">
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
              <Button
                className="w-full mt-5"
                type="submit"
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
