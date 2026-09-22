"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 500);
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
          <h1 className="text-3xl font-bold tracking-tight">새 글 작성</h1>
          <p className="mt-2 text-muted-foreground">
            게시판에 새로운 글을 작성해주세요.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>게시물 작성</CardTitle>
          <CardDescription>
            제목, 내용, 작성자명을 입력하고 등록해주세요.
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
                {isSubmitting ? "등록 중..." : "등록하기"}
              </Button>
              <Link href="/">
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
