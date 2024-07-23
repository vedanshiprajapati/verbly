import { zodResolver } from "@hookform/resolvers/zod";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signin, signinInput } from "@vedanshi/verbly-common";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<signin>({ resolver: zodResolver(signinInput) });
  const Navigate = useNavigate();
  const { login, isLoggingPending } = useContext(AuthContext);

  const handleSubmit2: SubmitHandler<FieldValues> = (data) => {
    const userInputs = data as signin;
    login(userInputs);
    reset();
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px] shadow-md border rounded-lg">
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
              <div className="flex mt-5 justify-between">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    Navigate(`/`);
                  }}
                >
                  <MoveLeft className="w-4 h-4 mr-1" />
                  Home
                </Button>
                <Button
                  className=""
                  type="submit"
                  disabled={isLoggingPending || isLoading}
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
