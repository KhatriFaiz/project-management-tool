import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_HOST } from "@/lib/contants";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginFormSchema),
  });
  const router = useRouter();

  const handleSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch(`${API_HOST}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });

      if (response.status === 401) {
        form.setError("root", { message: "Invalid email or password" });
        return;
      }

      if (response.ok) {
        const { token } = await response.json();
        // Save the token to local storage
        localStorage.setItem("token", token);
        router.push("/");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {form.formState.errors.root && (
              <p className="text-red-600">
                {form.formState.errors.root.message}
              </p>
            )}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
              <Button>Log in</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Not a member?{" "}
          <Link href="/signup" className="underline text-blue-500">
            Register now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
