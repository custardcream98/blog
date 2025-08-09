# blog

ISR를 위해 런타임 코드(본 레포)와 콘텐츠(`blog-posts`) 레포를 분리하여 관리중

## 레포지토리 역할

| 역할         | Repo                |             |
| ------------ | ------------------- | ----------- |
| Runtime / UI | **blog**(현재 레포) | Next.js App |
| Content      | `blog-posts`        | MDX, Assets |

## 빌드 타임 데이터 수집

**Octokit**(GitHub REST API 클라이언트)으로 `blog-posts` 레포에 존재하는 데이터를 불러옴

(`blog-posts` 레포에 데이터 정규화를 위한 스크립트 조금 존재함)

## Incremental Static Regeneration (ISR)

`src/app/api/revalidate-post/route.ts` 에 Route Handler를 두고 `revalidatePath()`를 호출하여 필요한 페이지만 on-demand로 다시 빌드

```text
blog-posts repo ──(Git Hook)─▶ /api/revalidate-post로 요청 ──▶ Next.js ISR
```

`blog-posts` 레포에서 MDX 파일이 생성·수정될 때마다 해당 slug 정보를 담아 요청을 보냄. Next.js는 전달받은 slug에 대응하는 경로만 다시 빌드

## 개발 환경

개발 중에는 submodule 활용 (GitHub API 사용하지 않음)

1. `blog-posts` 레포를 **Git Submodule**로 추가
2. `NODE_ENV === "development"`인 경우 서브모듈의 로컬 MDX 파일을 직접 읽어옴

### 포스트 내용 수정시 HMR 구현

서브모듈의 파일은 Next.js HMR watcher 대상이 아니므로 별도로 감지 로직 구현함

dev 실행시 동시에 서브모듈의 파일 변경을 감지하고 알리는 웹소켓 서버 실행, 클라이언트에서 파일 변경이 감지되면 페이지 리로드

구현된 내용은 `scripts/dev-submodule-watcher.mts`, `<SubmoduleAutoRefresher />`에 있음.

> 추가로, dev에서는 `unstable_cache` 미사용
