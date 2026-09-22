# Supabase 설정 가이드

이 프로젝트는 Supabase를 사용하여 팀 정보와 문의 양식 데이터를 관리합니다.

## 1. Supabase 프로젝트 생성

1. https://supabase.com 에 접속하여 계정을 생성합니다.
2. 새 프로젝트를 생성합니다.
3. 프로젝트 생성 후 다음 정보를 확인합니다:
   - Project URL
   - Anon Key (공개 가능한 키)

## 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 정보를 입력합니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. 데이터베이스 테이블 생성

### 3.1 team_members 테이블

Supabase 대시보드의 SQL Editor에서 다음 쿼리를 실행합니다:

```sql
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 예제 데이터 삽입
INSERT INTO team_members (id, name, role, description) VALUES
  ('1', '김민준', 'CEO & 창립자', '10년의 기술 리더십 경험'),
  ('2', '이수진', 'CTO', '클라우드 아키텍처 전문가'),
  ('3', '박지현', '리드 개발자', '풀스택 개발 및 DevOps'),
  ('4', '최영민', '디자인 리드', 'UX/UI 디자인 전문가');
```

### 3.2 contact_submissions 테이블

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 4. Row Level Security (RLS) 설정 (선택사항)

더 안전한 환경을 위해 RLS를 활성화합니다:

### team_members 테이블 - Read Only
```sql
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON team_members
  FOR SELECT USING (true);
```

### contact_submissions 테이블 - Insert Only
```sql
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert access for all users" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

## 5. npm 패키지 설치

```bash
npm install
```

## 6. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 을 열어 확인합니다.

## 기능

- **팀 정보**: Supabase의 `team_members` 테이블에서 동적으로 로드됩니다.
- **문의 양식**: 제출된 데이터는 `contact_submissions` 테이블에 저장됩니다.

## 문제 해결

### Supabase 연결 오류
- 환경 변수 확인: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase 프로젝트 상태 확인

### 테이블을 찾을 수 없음
- Supabase 대시보드에서 테이블이 생성되었는지 확인
- 테이블 이름이 정확한지 확인 (소문자)

### RLS 오류
- 테이블의 RLS 정책이 올바르게 설정되었는지 확인

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JS 클라이언트 가이드](https://supabase.com/docs/reference/javascript/introduction)
