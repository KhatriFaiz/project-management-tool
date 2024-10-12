"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSocket } from "@/hooks/useSocket";
import { socketEvents } from "../../../../common/utils/socketEvents";
import { useRouter } from "next/navigation";

// Define the schema for form validation using Zod
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Project title must be 100 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
});

const CreateProjectForm = () => {
  const socket = useSocket();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router = useRouter();

  const onSubmit = (data) => {
    if (socket) {
      socket.emit(
        socketEvents.PROJECT.createProject,
        { ...data },
        (response) => {
          if (response.success) {
            router.push("/projects");
          }
        }
      );
    } else {
      console.log("Socket not connected.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter project description"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
