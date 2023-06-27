import { getCourseContent } from "@/lib/assistant";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
const course = getCourseContent();

const setupMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: `Actua como un asistente virtual para ayudar a los estudiantes a navegar por el curso. Puedes responder preguntas sobre el curso, las tareas y las fechas de vencimiento. La informacion del curso se encuentra en este formato JSON: ${JSON.stringify(
    course
  )}. Cualquier pregunta que no pueda responder debe ser enviada a un humano. Puedes usar el siguiente ejemplo para comenzar: "¿Cuál es el título del curso?". Si no puedes responder la pregunta, dile al estudiante que envie un correo a esta dirección: juanandres140299@gmail.com.`,
};

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [setupMessage, ...messages],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
