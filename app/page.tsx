import Link from "next/link";

export default function Home() {
  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">GPTOUR</h1>
          <p className="py-6 text-lg- leading-loose">
            GPTOUR:
            AI旅行助手，幫助你規劃旅遊行程，提供旅遊建議，產生Google Map路徑，並且可以透過聊天與GPT-3進行諮詢。
            
          </p>
          <Link href="/chat" className="btn btn-secondary">
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
}
