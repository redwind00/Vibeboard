"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";

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

export default function PostDetail({ params }: PageProps) {
  const router = useRouter();
  const postId = parseInt(params.id);
  const post = samplePosts[postId];
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = () => {
    if (confirm("이 게시물을 삭제하시겠습니까?")) {
      setIsDeleting(true);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <p className="mt-2 text-muted-foreground">
            {post.author} · {post.createdAt} · 조회 {post.views}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription className="mt-3">
                작성자: {post.author} | 작성일: {post.createdAt} | 조회수: {post.views}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Link href={`/posts/${post.id}/edit`}>
                <Button variant="outline" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-foreground leading-relaxed">
              {post.content}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">목록으로 돌아가기</Button>
        </Link>
        <Link href={`/posts/${post.id}/edit`}>
          <Button>수정하기</Button>
        </Link>
      </div>
    </div>
  );
}
