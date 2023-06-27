"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompletion } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as z from "zod";
import { Textarea } from "./ui/textarea";
const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export default function CourseForm() {
  const { completion, isLoading, complete } = useCompletion({
    api: "/api/completion",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prompt = `
      Basado en el siguiente titulo y descripcion, crea, en formato markdown, genera un temario para el curso.

      - Titulo: ${values.title}
      - Descripcion: ${values.description}
    `;

    await complete(prompt);
  }
  return (
    <div className="py-6">
      <div className="max-w-lg mx-auto pb-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JavaScript para principiantes"
                      {...field}
                    />
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
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Este es un curso para principiantes de JavaScript."
                      rows={3}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : "Generar"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-8 max-w-3xl mx-auto max-h-[600px] overflow-y-auto p-4 border">
        <ReactMarkdown className="prose dark:prose-invert ">
          {completion}
        </ReactMarkdown>
      </div>
    </div>
  );
}
