import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibeboard - 게시판",
  description: "Next.js와 shadcn으로 만든 현대적인 게시판 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b bg-card">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <h1 className="text-3xl font-bold text-primary">Vibeboard</h1>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
