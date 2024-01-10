"use server";

export async function generateChatResponse(chatMessage: string) {
  console.log("chatMessage", chatMessage.split(" "));
  return "awesome";
}
