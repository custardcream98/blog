import { octokit } from "./instance"

const DEFAULT_CONFIG = {
  owner: "custardcream98",
  repo: "blog-posts",
} as const

export const getPostsList = async () => {
  //   const { data } = await octokit.rest.repos.getContent({
  //     ...DEFAULT_CONFIG,
  //     path: "post-list.json",
  //     mediaType: {
  //       format: "raw",
  //     },
  //   })

  //  return JSON.parse(data as unknown as string) as (
  //    | {
  //        slug: string
  //        title: string
  //        excerpt: string
  //        date: string
  //        category: string[]
  //        series?: string
  //      }
  //  )[]
  return [
    {
      title: "isPending만으로 따닥을 막을 수 없는 이유",
      excerpt:
        "React Query의 `useMutation`을 사용할 때 `isPending`으로 요청중 버튼을 `disabled`로 만들어도 중복 호출을 완전히 막을 수는 없는 이유",
      date: "2025-07-16",
      category: ["React.js"],
      slug: "use-mutation-is-pending",
    },
    {
      title: "React Server Components 살펴보기",
      excerpt: "RSC를 구현한 원리는 무엇일지 알아봅니다.",
      date: "2025-06-04",
      category: ["React"],
      series: "React",
      slug: "how-rsc-works",
    },
    {
      title: "귀찮은 레거시 AST로 도장깨기",
      excerpt:
        "레거시 코드 언제 일일히 바꾸고 앉아 있나 고민하다 ts-morph로 조금 더 편하게 리팩토링한 경험을 공유합니다.",
      date: "2024-07-17",
      category: ["React.js", "TypeScript"],
      slug: "effective-refactor-with-ast",
    },
    {
      title: "개발자 마인드",
      excerpt:
        "요즘 드는 생각과 최근 회고 - 현 회사에서 즐거웠던 시간을 마무리하고 새로운 곳으로 이직하게 된 기념으로 오랜만에 간단하게 회고를 해보려고 합니다.",
      date: "2024-04-02",
      category: ["etc"],
      series: "회고",
      slug: "devmind",
    },
    {
      title: "리액트 클린코딩",
      excerpt: "리액트를 사용할 때 '클린 코드'를 작성하려면 어떻게 해야 할까요?",
      date: "2023-12-03",
      category: ["React.js"],
      slug: "react-clean-code",
    },
    {
      title: "리액트 전역 상태 관리 라이브러리 개발해보기",
      excerpt: "Context API와 전역 상태 관리 라이브러리에 대해 고찰해보고 직접 구현해봅니다.",
      date: "2023-11-19",
      category: ["React.js"],
      slug: "global-state-management",
    },
    {
      title: "CSS-in-JS와 서버 컴포넌트",
      excerpt:
        "CSS-in-JS와 서버 컴포넌트는 왜 공존하기 어려운지 알아보고, 이를 해결하기 위해 styled-components를 Tailwind CSS로 마이그레이션한 경험을 공유합니다.",
      date: "2023-09-26",
      category: ["Next.js"],
      slug: "next-13-and-css-in-js",
    },
    {
      title: "주니어 개발자로서 GPT를 바라보는 관점",
      excerpt: "GPT는 개발자를 대체할 수 있을까요? 주니어 개발자로서의 제 생각을 정리해봅니다.",
      date: "2023-07-10",
      category: ["thoughts"],
      slug: "how-should-a-dev-deal-with-gpt",
    },
    {
      title: "내가 인턴십을 통해 얻은 것",
      excerpt: "개발자로서 첫 커리어였던 Wavve Tech Internship을 통해 얻은 것들을 정리해봅니다.",
      date: "2023-06-29",
      category: ["etc"],
      series: "회고",
      slug: "internship-retro",
    },
    {
      title: "includes의 타입은 어떻게 대응하는게 좋을까",
      excerpt:
        "Array.includes() 메서드에 넣을 수 있는 값의 타입은 제 생각과 달랐습니다. 어떻게 하면 더 논리적인 타입을 사용해 대응할 수 있을까요?",
      date: "2023-03-22",
      category: ["TypeScript"],
      series: "Troubleshooting",
      slug: "includes-type-consider",
    },
    {
      title: "콘텐츠웨이브 Web Developer 인턴 합격하기까지 짧은 취준기 회고",
      excerpt:
        "콘텐츠웨이브에서 개발자로서 첫 발을 내딛게 됐습니다!! 인턴 합격을 기념하며 짧은 취준기를 회고해 봤습니다.",
      date: "2023-03-03",
      category: ["etc"],
      series: "회고",
      slug: "contentwave-intern-job-hunt",
    },
  ]
}

export const getPosts = async () => {
  //   const { data } = await octokit.rest.repos.getContent({
  //     owner: "custardcream98",
  //     repo: "blog-posts",
  //     path: "posts",
  //   })

  return [
    [
      {
        name: "contentwave-intern-job-hunt.mdx",
        path: "posts/contentwave-intern-job-hunt.mdx",
        sha: "94a90bad84e0d34563f0b52e32bc467857b1711c",
        size: 9958,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/contentwave-intern-job-hunt.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/contentwave-intern-job-hunt.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/94a90bad84e0d34563f0b52e32bc467857b1711c",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/contentwave-intern-job-hunt.mdx?token=AU27Q3JLNRG26ZAO6KT4Y5TIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/contentwave-intern-job-hunt.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/94a90bad84e0d34563f0b52e32bc467857b1711c",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/contentwave-intern-job-hunt.mdx",
        },
      },
      {
        name: "devmind.mdx",
        path: "posts/devmind.mdx",
        sha: "315ecb70090e905fbfc81ec2e361f7ff86246a2f",
        size: 6599,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/devmind.mdx?ref=main",
        html_url: "https://github.com/custardcream98/blog-posts/blob/main/posts/devmind.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/315ecb70090e905fbfc81ec2e361f7ff86246a2f",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/devmind.mdx?token=AU27Q3LONU7PAMOWF55JNP3IQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/devmind.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/315ecb70090e905fbfc81ec2e361f7ff86246a2f",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/devmind.mdx",
        },
      },
      {
        name: "effective-refactor-with-ast.mdx",
        path: "posts/effective-refactor-with-ast.mdx",
        sha: "344cc5c7b09fc951948b131fb62309e8d38f737b",
        size: 8675,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/effective-refactor-with-ast.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/effective-refactor-with-ast.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/344cc5c7b09fc951948b131fb62309e8d38f737b",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/effective-refactor-with-ast.mdx?token=AU27Q3OULM6GKISVAUAIRQDIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/effective-refactor-with-ast.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/344cc5c7b09fc951948b131fb62309e8d38f737b",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/effective-refactor-with-ast.mdx",
        },
      },
      {
        name: "global-state-management.mdx",
        path: "posts/global-state-management.mdx",
        sha: "61533fd02f819d725ef15f47879d96c1ea535489",
        size: 24067,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/global-state-management.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/global-state-management.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/61533fd02f819d725ef15f47879d96c1ea535489",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/global-state-management.mdx?token=AU27Q3JRPMKJFLXPERD5ALDIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/global-state-management.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/61533fd02f819d725ef15f47879d96c1ea535489",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/global-state-management.mdx",
        },
      },
      {
        name: "how-rsc-works.mdx",
        path: "posts/how-rsc-works.mdx",
        sha: "2777a3d6cf01b75a89eb5acb11e2fdd51b0a541d",
        size: 13844,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/how-rsc-works.mdx?ref=main",
        html_url: "https://github.com/custardcream98/blog-posts/blob/main/posts/how-rsc-works.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/2777a3d6cf01b75a89eb5acb11e2fdd51b0a541d",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/how-rsc-works.mdx?token=AU27Q3IOXN7INFQC5WW7EH3IQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/how-rsc-works.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/2777a3d6cf01b75a89eb5acb11e2fdd51b0a541d",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/how-rsc-works.mdx",
        },
      },
      {
        name: "how-should-a-dev-deal-with-gpt.mdx",
        path: "posts/how-should-a-dev-deal-with-gpt.mdx",
        sha: "714ed97cf546a1f3df6c4ac191d9e3a329e33c45",
        size: 8608,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/how-should-a-dev-deal-with-gpt.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/how-should-a-dev-deal-with-gpt.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/714ed97cf546a1f3df6c4ac191d9e3a329e33c45",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/how-should-a-dev-deal-with-gpt.mdx?token=AU27Q3JFU5X42BEUASQ4DWLIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/how-should-a-dev-deal-with-gpt.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/714ed97cf546a1f3df6c4ac191d9e3a329e33c45",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/how-should-a-dev-deal-with-gpt.mdx",
        },
      },
      {
        name: "includes-type-consider.mdx",
        path: "posts/includes-type-consider.mdx",
        sha: "5467a0b42b28596293366343dd380b60400d9cb2",
        size: 5463,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/includes-type-consider.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/includes-type-consider.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/5467a0b42b28596293366343dd380b60400d9cb2",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/includes-type-consider.mdx?token=AU27Q3ORLWLHL4QS75CVE43IQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/includes-type-consider.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/5467a0b42b28596293366343dd380b60400d9cb2",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/includes-type-consider.mdx",
        },
      },
      {
        name: "internship-retro.mdx",
        path: "posts/internship-retro.mdx",
        sha: "dd8933b986644cb8616b178feb1f4562f15ba7a5",
        size: 11367,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/internship-retro.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/internship-retro.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/dd8933b986644cb8616b178feb1f4562f15ba7a5",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/internship-retro.mdx?token=AU27Q3PQJGSFRPKXURRQIA3IQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/internship-retro.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/dd8933b986644cb8616b178feb1f4562f15ba7a5",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/internship-retro.mdx",
        },
      },
      {
        name: "next-13-and-css-in-js.mdx",
        path: "posts/next-13-and-css-in-js.mdx",
        sha: "6a67d0531d5b9e844369d48f4eef256180f17b65",
        size: 23153,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/next-13-and-css-in-js.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/next-13-and-css-in-js.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/6a67d0531d5b9e844369d48f4eef256180f17b65",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/next-13-and-css-in-js.mdx?token=AU27Q3IOXNUXRC74OUADD6TIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/next-13-and-css-in-js.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/6a67d0531d5b9e844369d48f4eef256180f17b65",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/next-13-and-css-in-js.mdx",
        },
      },
      {
        name: "react-clean-code.mdx",
        path: "posts/react-clean-code.mdx",
        sha: "32dc1d2619dd3f6f3a8e0b8e8103cb1af27221d4",
        size: 31065,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/react-clean-code.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/react-clean-code.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/32dc1d2619dd3f6f3a8e0b8e8103cb1af27221d4",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/react-clean-code.mdx?token=AU27Q3KPUKY5UBBQ7Q4C66LIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/react-clean-code.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/32dc1d2619dd3f6f3a8e0b8e8103cb1af27221d4",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/react-clean-code.mdx",
        },
      },
      {
        name: "use-mutation-is-pending.mdx",
        path: "posts/use-mutation-is-pending.mdx",
        sha: "bd3b7604b17dd6e80ec7199d101e498fbf36e217",
        size: 10551,
        url: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/use-mutation-is-pending.mdx?ref=main",
        html_url:
          "https://github.com/custardcream98/blog-posts/blob/main/posts/use-mutation-is-pending.mdx",
        git_url:
          "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/bd3b7604b17dd6e80ec7199d101e498fbf36e217",
        download_url:
          "https://raw.githubusercontent.com/custardcream98/blog-posts/main/posts/use-mutation-is-pending.mdx?token=AU27Q3LEFNMOHJPJXTBWXLTIQTJG4",
        type: "file",
        _links: {
          self: "https://api.github.com/repos/custardcream98/blog-posts/contents/posts/use-mutation-is-pending.mdx?ref=main",
          git: "https://api.github.com/repos/custardcream98/blog-posts/git/blobs/bd3b7604b17dd6e80ec7199d101e498fbf36e217",
          html: "https://github.com/custardcream98/blog-posts/blob/main/posts/use-mutation-is-pending.mdx",
        },
      },
    ],
  ]
}

export const getPostImages = async ({ slug }: { slug: string }) => {
  const { data } = await octokit.rest.repos.getContent({
    ...DEFAULT_CONFIG,
    path: `img/${slug}`,
  })

  return data as unknown as { path: string; name: string }[]
}

export const getPost = async ({ slug }: { slug: string }) => {
  const [{ data }, images] = await Promise.all([
    octokit.rest.repos.getContent({
      ...DEFAULT_CONFIG,
      path: `posts/${slug}.mdx`,
      mediaType: {
        format: "raw",
      },
    }) as unknown as Promise<{ data: string }>,
    getPostImages({ slug }),
  ])

  let result = data
  images.forEach(({ path }) => {
    console.log("path", path)
    result = result.replaceAll(
      `/${path}`,
      `https://storage.googleapis.com/blog-e8ab2.appspot.com/${path}`,
    )
  })

  return result
}
