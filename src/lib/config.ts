const DEPLOYMENT_URL_MAP = {
  development: "http://localhost:3000",
  preview: `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`,
  production: process.env.NEXT_PUBLIC_HOST,
} as const;

export const config = {
  DEPLOYMENT_URL:
    DEPLOYMENT_URL_MAP[
      (process.env.NEXT_PUBLIC_VERCEL_ENV as "development" | "preview" | "production") ??
        "development"
    ],
};
