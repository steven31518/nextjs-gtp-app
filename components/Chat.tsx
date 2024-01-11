"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/utils/action";
import toast from "react-hot-toast";
import type { ChatCompletionMessage } from "openai/resources/index.mjs";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const { mutate, data, isPending } = useMutation({
    mutationFn: (query: ChatCompletionMessage) =>
      generateChatResponse([...messages, query]),

    onSuccess: (data) => {
      if (!data) {
        toast.error("Error");
        return;
      }
      setMessages((pre) => [...pre, data]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = { role: "user", content: text } as ChatCompletionMessage;
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, i) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bcg = role == "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={i}
              className={`${bcg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4 ">{avatar}</span>
              <p className="max-w-3xl text-sm">{content}</p>
            </div>
          );
        })}
        {isPending && <span className="loading"></span>}
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
            className="btn btn-secondary join-item capitalize"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "loading..." : " ask question"}
          </button>
        </div>
      </form>
    </div>
  );
}
