import { Octokit } from "octokit"

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    // Ensure Next.js does not persist fetch cache for GitHub requests
    // so our own unstable_cache + tag invalidation controls staleness.
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, {
        ...init,
        cache: "no-store",
      }),
  },
})
