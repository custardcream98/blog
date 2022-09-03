import { KEY_VIEWS } from "../firebaseSetup/collectionNames";
import { KEY_IS_LIKED } from "./keys";

const getViewedLocalStorageKey = (title: string) => KEY_VIEWS + "-" + title;

const getIsLikedLocalStorageKey = (title: string) => KEY_IS_LIKED + "-" + title;

export const setViewedTimeOnLocal = (title: string, time: number) =>
  localStorage.setItem(getViewedLocalStorageKey(title), time.toString());

export const getViewedTimeOnLocal = (title: string) =>
  parseInt(localStorage.getItem(getViewedLocalStorageKey(title)) ?? "0");

export const toggleIsLikedOnLocal = (title: string) =>
  localStorage.setItem(
    getIsLikedLocalStorageKey(title),
    (!getIsLikedOnLocal(title)).toString()
  );

export const getIsLikedOnLocal = (title: string) =>
  JSON.parse(localStorage.getItem(getIsLikedLocalStorageKey(title)) ?? "false");