import axios from "axios";
import https from "https";

export const postMail = (
  title: string,
  username: string,
  comment: string
) =>
  axios
    .post(
      `https://${process.env.NEXT_PUBLIC_HOST}/api/alert-sw`,
      {
        postTitle: title,
        username,
        comment,
        linkToPost: window.location.href,
      },
      {
        headers: { "Content-Type": "application/json" },
        httpsAgent: new https.Agent({ keepAlive: true }),
      }
    )
    .catch((error) => {
      throw Error("Failed to send alert to Shioo", error);
    });
