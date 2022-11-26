import axios from "axios";
import https from "https";
import { SearchedPost } from "../interfaces/searchedPosts";

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

export const searchPosts = (
  query: string
): Promise<SearchedPost[]> =>
  axios
    .get(
      `https://${process.env.NEXT_PUBLIC_HOST}/api/search`,
      {
        params: { q: query },
      }
    )
    .then((res) => res.data);
