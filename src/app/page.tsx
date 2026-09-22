"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Vibeboard에 오신 것을 환영합니다!",
      content: "이것은 첫 번째 게시물입니다. Next.js와 shadcn으로 만든 현대적인 게시판입니다.",
      author: "Admin",
      createdAt: "2024-09-22",
      views: 42,
    },
    {
      id: 2,
      title: "Next.js 소개",
      content: "Next.js는 React를 기반으로 한 프레임워크입니다. SSR, SSG 등의 기능을 제공합니다.",
      author: "Developer",
      createdAt: "2024-09-21",
      views: 28,
    },
  ]);

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">게시판</h2>
          <p className="mt-2 text-muted-foreground">
            최신 글부터 총 {posts.length}개의 게시물이 있습니다.
          </p>
        </div>
        <Link href="/posts/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            새 글 작성
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              게시물이 없습니다. 첫 번째 게시물을 작성해보세요!
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link href={`/posts/${post.id}`}>
                      <CardTitle className="hover:text-primary cursor-pointer transition-colors">
                        {post.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="mt-2">
                      {post.author} · {post.createdAt} · 조회 {post.views}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/posts/${post.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground line-clamp-2">{post.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
