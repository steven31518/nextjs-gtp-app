"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  generateChatResponse,
  fetchUserTokenById,
  subtractTokens,
} from "@/utils/action";
import toast from "react-hot-toast";
import type { ChatCompletionMessage } from "openai/resources/index.mjs";
import { useAuth } from "@clerk/nextjs";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: async (query: ChatCompletionMessage) => {
      const currentToken = await fetchUserTokenById(userId as string); //check token
      if (currentToken && currentToken < 300) {
        toast.error("You don't have enough token");
        return;
      }
      const response = await generateChatResponse([...messages, query]);
      
      if (!response) {
        toast.error("Error");
        return;
      }
      setMessages((pre) => [...pre, response.message]);
      const newTokens = await subtractTokens(
        userId as string,
        response.tokens as number
      );
      toast.success(`You have ${newTokens} tokens left`);
    },

    // mutationFn: (query: ChatCompletionMessage) =>
    //   generateChatResponse([...messages, query]),
    // onSuccess: (data) => {
    //   if (!data) {
    //     toast.error("Error");
    //     return;
    //   }
    // },
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
            placeholder="詢問任何問題..."
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
            {isPending ? "讀取中" : "送出訊息"}
          </button>
        </div>
      </form>
    </div>
  );
}
