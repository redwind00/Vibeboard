# Supabase SQL 구문

Supabase 대시보드의 SQL Editor에서 아래 쿼리들을 차례대로 실행하세요.

## 1. 테이블 생성 및 초기 데이터 입력

### team_members 테이블 생성

```sql
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 팀 초기 데이터 삽입

```sql
INSERT INTO team_members (id, name, role, description) VALUES
  ('1', '김민준', 'CEO & 창립자', '10년의 기술 리더십 경험'),
  ('2', '이수진', 'CTO', '클라우드 아키텍처 전문가'),
  ('3', '박지현', '리드 개발자', '풀스택 개발 및 DevOps'),
  ('4', '최영민', '디자인 리드', 'UX/UI 디자인 전문가');
```

### contact_submissions 테이블 생성

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 2. Row Level Security (RLS) 설정

### team_members - 읽기 전용 정책

```sql
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON team_members
  FOR SELECT USING (true);
```

### contact_submissions - 삽입만 가능한 정책

```sql
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert access for all users" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

## 3. 데이터 조회 (선택사항)

### 모든 팀 멤버 조회

```sql
SELECT * FROM team_members ORDER BY id;
```

### 모든 문의 조회

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

### 특정 날짜 이후의 문의 조회

```sql
SELECT * FROM contact_submissions 
WHERE created_at >= '2024-01-01' 
ORDER BY created_at DESC;
```

## 4. 데이터 관리 (선택사항)

### 팀 멤버 추가

```sql
INSERT INTO team_members (id, name, role, description) VALUES
  ('5', '이름', '직급', '소개');
```

### 팀 멤버 수정

```sql
UPDATE team_members 
SET name = '새로운 이름', role = '새로운 직급'
WHERE id = '1';
```

### 팀 멤버 삭제

```sql
DELETE FROM team_members WHERE id = '5';
```

### 문의 삭제 (선택사항)

```sql
DELETE FROM contact_submissions 
WHERE id = 'uuid-값';
```

## 5. 테이블 정보 확인

### 테이블 구조 확인

```sql
-- team_members 테이블
\d team_members

-- contact_submissions 테이블
\d contact_submissions
```

## 주의사항

- 첫 실행 시 1~3번 섹션의 쿼리를 순서대로 실행하세요.
- RLS 정책이 설정되지 않으면 보안이 취약할 수 있습니다.
- 프로덕션 환경에서는 추가 보안 설정이 필요합니다.
