import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechVision - 기술의 미래를 만드는 회사",
  description: "AI 기반의 혁신적인 솔루션으로 디지털 세상을 변화시키는 기술회사입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-background flex flex-col">
          {/* Header/Navigation */}
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  T
                </div>
                <h1 className="text-xl font-bold text-primary">TechVision</h1>
              </div>
              <nav className="hidden md:flex gap-8 text-sm">
                <a href="#" className="hover:text-primary transition-colors">홈</a>
                <a href="#" className="hover:text-primary transition-colors">서비스</a>
                <a href="#" className="hover:text-primary transition-colors">팀</a>
                <a href="#" className="hover:text-primary transition-colors">문의</a>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t bg-card">
            <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 TechVision. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
