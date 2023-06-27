import Chat from "@/components/Chat";
import React from "react";

export default function page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center my-2">
        Chat with the assistant
      </h1>
      <Chat />
    </>
  );
}
