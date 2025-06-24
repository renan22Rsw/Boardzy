"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const CreateWorkspaceDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const workspaceSchema = z.object({
    workspace: z
      .string()
      .min(3, "Workspace name must be at least 3 characters long"),
  });

  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspace: "",
    },
  });

  const onSubmit = (data: z.infer<typeof workspaceSchema>) => {
    console.log(data);
    setDialogOpen(false); // Fecha o dialog após o submit
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Plus className="h-4 w-4" cursor={"pointer"} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new workspace</DialogTitle>
          <DialogDescription>
            Enter a name for your new workspace
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="workspace"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Workspace name"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
