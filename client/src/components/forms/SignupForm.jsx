"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSocketContext } from "../providers/SocketProvider";
import { socketEvents } from "../../../../common/utils/socketEvents";
import { useEffect } from "react";

const LoginFormSchema = z.object({
  name: z.string().min(3, "Name should contain atleast 3 characters"),
  username: z.string().min(3, "Username should contain atleast 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be 8 characters long"),
});

const SignupForm = () => {
  const form = useForm({
    defaultValues: { name: "", email: "", username: "", password: "" },
    resolver: zodResolver(LoginFormSchema),
  });
  const socket = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on(socketEvents.AUTH.successfulLogin, (user, token) => {
        console.log(user, token);
      });
    }
  }, [socket]);

  const handleSubmit = async (data) => {
    socket.emit(socketEvents.AUTH.signupWithEmailAndPassword, { ...data });
  };

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Sign up</Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p>
          Already a member?{" "}
          <Link href="/login" className="underline text-blue-500">
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
