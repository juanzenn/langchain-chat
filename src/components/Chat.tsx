"use client";
import { useChat } from "ai/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function Chat() {
  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    append,
  } = useChat();

  useEffect(() => {
    append({
      content:
        "El usuario acaba de iniciar el chat. Tienes permiso para leer el contenido JSON sobre el curso. Cualquier pregunta que no tenga que ver con el contenido del curso, responderas una negativa inmediata corta. Responde a este mensaje con un saludo al estudiante.",
      role: "system",
    });
  }, [append]);

  return (
    <section className="relative w-full max-w-6xl mx-auto h-[90vh] flex flex-col border p-6 rounded-xl">
      <div className="space-y-6 h-full overflow-y-auto pb-12 pr-6">
        {messages
          .filter((m) => m.role !== "system")
          .map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <CardTitle>{getCardTitle(m.role)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{m.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
      </div>

      {isLoading && (
        <div className="absolute bottom-6 right-6">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-auto">
        <label>
          <Input
            disabled={isLoading}
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
            className="w-5/6 mt-6"
          />
        </label>
      </form>
    </section>
  );
}

function getCardTitle(role: "system" | "user" | "assistant") {
  switch (role) {
    case "system":
      return "System";
    case "user":
      return "You";
    case "assistant":
      return "Assistant";
  }
}
