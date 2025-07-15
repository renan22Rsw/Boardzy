"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoardColorPicker } from "./board-color-picker";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { boardSchema } from "@/schemas/board-schema";

export const CreateBoard = ({ boardRemaning }: { boardRemaning: number }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { getToken, orgId } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "",
      color: "#8000ff",
    },
  });

  const onSubmit = async (data: z.infer<typeof boardSchema>) => {
    const { title, color } = data;
    setDialogOpen(false);

    try {
      const token = await getToken();
      const response = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, color, orgId }),
      });

      const data = await response.json();
      toast.success(data.message);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="h-[80px] cursor-pointer rounded-md bg-zinc-100 pt-2 text-center lg:w-[240px] dark:bg-zinc-800">
          <h6 className="px-2 font-semibold">Create new board</h6>
          <span>
            {boardRemaning === 0 || !boardRemaning ? 5 : 5 - boardRemaning}{" "}
            remaining
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
          <DialogDescription>Enter a name for your new board</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <BoardColorPicker
                      onChange={field.onChange}
                      color={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Board title"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">
              Create board
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
