"use client";

import { Form } from "../ui/form";
import FormField from "./FormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must have atleast 3 characters"),
  description: z.string(),
});

const CreateTaskForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          <FormField form={form} label="Task Title" name="title" />
          <FormField
            form={form}
            type="textarea"
            label="Project Description"
            name="description"
            placeholder="Enter project description"
          />
          <Button type="submit" className="w-full">
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTaskForm;
