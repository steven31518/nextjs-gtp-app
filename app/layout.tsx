import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPTOUR - AI旅行助手",
  description:
    "AI旅行助手:幫助你規劃旅遊行程，提供旅遊建議，產生Google Map路徑，並且可以透過聊天與GPT-3進行諮詢!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
