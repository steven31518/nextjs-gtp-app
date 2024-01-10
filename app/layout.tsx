import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPTGenius",
  description:
    "GPTGenius: Your AI language companion. Powered by OpenAI, it enhances your conversations, content creation, and more!",
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
