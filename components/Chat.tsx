"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/utils/action";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const { mutate } = useMutation({
    mutationFn: (message: string) => generateChatResponse(message),
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(text);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Massage GeniusGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="btn btn-primary join-item capitalize"
            type="submit"
          >
            ask question
          </button>
        </div>
      </form>
    </div>
  );
}
