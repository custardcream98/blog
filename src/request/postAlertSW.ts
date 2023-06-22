import type { AlertSWResponse } from "src/types/alertSW";

import { nextApi } from "./axios";

import https from "https";

const POST_MAIL_URL = "/alert-sw";

export type PostAlertSWRequestBody = {
  postTitle: string;
  username: string;
  comment: string;
};
export const postAlertSW = async ({ postTitle, username, comment }: PostAlertSWRequestBody) => {
  const response = await nextApi.post<AlertSWResponse>(
    POST_MAIL_URL,
    {
      comment,
      linkToPost: window.location.href,
      postTitle,
      username,
    },
    {
      httpsAgent: new https.Agent({ keepAlive: true }),
    },
  );

  return response.data;
};
