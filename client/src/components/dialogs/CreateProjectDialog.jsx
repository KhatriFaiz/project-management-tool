"use client";

import CreateProjectForm from "../forms/CreateProjectForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

const CreateProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Let's start a new project</DialogTitle>
          <DialogDescription>
            You will be the project manager of this project. You can change it
            latter.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
