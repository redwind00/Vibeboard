"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Zap,
  Shield,
  Rocket,
  Users,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
}

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: "1",
      name: "김민준",
      role: "CEO & 창립자",
      description: "10년의 기술 리더십 경험",
    },
    {
      id: "2",
      name: "이수진",
      role: "CTO",
      description: "클라우드 아키텍처 전문가",
    },
    {
      id: "3",
      name: "박지현",
      role: "리드 개발자",
      description: "풀스택 개발 및 DevOps",
    },
    {
      id: "4",
      name: "최영민",
      role: "디자인 리드",
      description: "UX/UI 디자인 전문가",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const features = [
    {
      icon: Zap,
      title: "고성능",
      description: "최적화된 인프라로 극도의 속도와 안정성을 제공합니다.",
    },
    {
      icon: Shield,
      title: "보안",
      description: "엔터프라이즈급 보안으로 데이터를 완벽하게 보호합니다.",
    },
    {
      icon: Rocket,
      title: "확장성",
      description: "비즈니스 성장에 맞춰 자유롭게 확장할 수 있습니다.",
    },
    {
      icon: Users,
      title: "협업",
      description: "팀 전체가 효율적으로 협업할 수 있는 도구를 제공합니다.",
    },
  ];

  // Load team from Supabase
  useEffect(() => {
    const loadTeam = async () => {
      try {
        if (!isSupabaseConfigured || !supabase) {
          console.log("Supabase not configured, using default data");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.log(
            "Team table not found in Supabase, using default data"
          );
        } else if (data && data.length > 0) {
          setTeam(data);
        }
      } catch (error) {
        console.log("Error loading team data, using default data");
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");

    try {
      if (!isSupabaseConfigured || !supabase) {
        setSubmitMessage(
          "⚠️ Supabase가 설정되지 않았습니다. 환경 변수를 확인해주세요."
        );
        setContactForm({ name: "", email: "", message: "" });
        return;
      }

      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setSubmitMessage("❌ 오류가 발생했습니다. 다시 시도해주세요.");
      } else {
        setSubmitMessage(
          "✅ 메시지가 전송되었습니다. 감사합니다!"
        );
        setContactForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setSubmitMessage(
        "⚠️ 메시지 전송 중 오류가 발생했습니다."
      );
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="space-y-8 py-12">
        <div className="space-y-6 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-4 py-2">
            <p className="text-sm font-medium text-primary">✨ 기술의 미래를 만드는 회사</p>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl">
            혁신적인 솔루션으로
            <br />
            디지털 세상을 변화시키다
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            우리는 기술을 통해 기업의 성장을 가속화합니다.
            최고 수준의 서비스와 지원으로 당신의 꿈을 현실로 만들어드립니다.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2">
            시작하기
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            데모 보기
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-center text-sm text-muted-foreground mb-4">
            믿을 수 있는 기업들이 우리를 선택합니다
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-lg font-semibold">TechCorp</div>
            <div className="text-lg font-semibold">StartUp Inc</div>
            <div className="text-lg font-semibold">Global AI</div>
            <div className="text-lg font-semibold">CloudPro</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tighter">
            우리만의 강점
          </h2>
          <p className="text-lg text-muted-foreground">
            업계 최고 수준의 기술과 서비스를 제공합니다
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-0 bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 inline-block rounded-lg bg-primary/10 p-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-8 py-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tighter">
            왜 우리를 선택해야 할까요?
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">최첨단 기술</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI, 머신러닝, 클라우드 컴퓨팅 등 최신 기술을 활용하여
              비즈니스의 경쟁력을 강화합니다.
            </p>
            <div className="space-y-3">
              {["AI 기반 분석", "실시간 처리", "자동화 솔루션"].map(
                (item) => (
                  <div key={item} className="flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">전문 지원팀</h3>
            <p className="text-muted-foreground leading-relaxed">
              경험 많은 전문가들이 24/7 고객 지원을 제공하며
              당신의 성공을 위해 함께합니다.
            </p>
            <div className="space-y-3">
              {["24시간 지원", "전문 컨설팅", "맞춤 솔루션"].map(
                (item) => (
                  <div key={item} className="flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tighter">
            우리의 팀
          </h2>
          <p className="text-lg text-muted-foreground">
            재능 있는 전문가들로 구성된 팀입니다
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.name} className="border-0 bg-card">
              <CardHeader>
                <div className="mb-4 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg"></div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="font-medium text-primary">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-8 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 md:p-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tighter">
            지금 시작하세요
          </h2>
          <p className="text-lg text-muted-foreground">
            당신의 비즈니스를 다음 단계로 끌어올릴 준비가 되셨나요?
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2">
            무료 상담 신청
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            문의하기
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="space-y-8 border-t pt-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold">문의하기</h3>
          <p className="text-muted-foreground">
            궁금한 점이 있으시면 아래 양식을 작성해주세요.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-card">
            <CardHeader>
              <CardTitle>메시지 전송</CardTitle>
              <CardDescription>
                Supabase를 통해 안전하게 전송됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    이름
                  </label>
                  <Input
                    id="name"
                    placeholder="이름을 입력해주세요"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    이메일
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    메시지
                  </label>
                  <Textarea
                    id="message"
                    placeholder="메시지를 입력해주세요"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    required
                    disabled={submitting}
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? "전송 중..." : "메시지 전송"}
                </Button>

                {submitMessage && (
                  <p className="text-center text-sm mt-4">{submitMessage}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="space-y-8 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-0 bg-card text-center">
            <CardHeader>
              <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle>이메일</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">contact@techvision.com</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card text-center">
            <CardHeader>
              <Linkedin className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle>LinkedIn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">@techvision</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card text-center">
            <CardHeader>
              <Github className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle>GitHub</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">github.com/techvision</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
