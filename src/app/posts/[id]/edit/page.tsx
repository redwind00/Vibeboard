"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
}

const samplePosts: Record<number, Post> = {
  1: {
    id: 1,
    title: "Vibeboard에 오신 것을 환영합니다!",
    content:
      "이것은 첫 번째 게시물입니다. Next.js와 shadcn으로 만든 현대적인 게시판입니다.\n\nVibeboard는 다음과 같은 기능을 제공합니다:\n\n- 게시물 작성, 수정, 삭제\n- 간단한 UI/UX\n- TypeScript 타입 안전성\n- Tailwind CSS로 스타일링\n\n더 많은 기능이 추가될 예정입니다.",
    author: "Admin",
    createdAt: "2024-09-22",
    views: 42,
  },
  2: {
    id: 2,
    title: "Next.js 소개",
    content:
      "Next.js는 React를 기반으로 한 프레임워크입니다.\n\nSSR, SSG 등의 기능을 제공합니다.\n\nApp Router를 사용한 현대적인 라우팅 시스템을 지원합니다.",
    author: "Developer",
    createdAt: "2024-09-21",
    views: 28,
  },
};

export default function EditPost({ params }: PageProps) {
  const router = useRouter();
  const postId = parseInt(params.id);
  const post = samplePosts[postId];

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) {
    return (
      <div className="space-y-6">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            게시물을 찾을 수 없습니다.
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/posts/${postId}`);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/posts/${postId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">게시물 수정</h1>
          <p className="mt-2 text-muted-foreground">
            게시물을 수정하고 저장해주세요.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>게시물 수정</CardTitle>
          <CardDescription>
            제목, 내용, 작성자명을 수정하고 저장해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-2">
                작성자명
              </label>
              <Input
                id="author"
                placeholder="작성자명을 입력해주세요"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                제목
              </label>
              <Input
                id="title"
                placeholder="게시물 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                내용
              </label>
              <Textarea
                id="content"
                placeholder="게시물 내용을 입력해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장하기"}
              </Button>
              <Link href={`/posts/${postId}`}>
                <Button variant="outline">
                  취소
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
