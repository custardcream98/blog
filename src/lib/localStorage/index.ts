import { LocalStorageKeys } from "./keys";

const getViewedLocalStorageKey = (title: string) => LocalStorageKeys.LAST_VIEWED + "-" + title;

const getIsLikedLocalStorageKey = (title: string) => LocalStorageKeys.IS_LIKED + "-" + title;

export const setViewedTimeOnLocal = (title: string, time: number) =>
  localStorage.setItem(getViewedLocalStorageKey(title), time.toString());

export const getViewedTimeOnLocal = (title: string) =>
  parseInt(localStorage.getItem(getViewedLocalStorageKey(title)) ?? "0", 10);

export const toggleIsLikedOnLocal = (title: string) =>
  localStorage.setItem(getIsLikedLocalStorageKey(title), (!getIsLikedOnLocal(title)).toString());

export const getIsLikedOnLocal = (title: string) =>
  JSON.parse(localStorage.getItem(getIsLikedLocalStorageKey(title)) ?? "false");

export const getIsDarkmodeActivatedOnLocal = (): boolean => {
  const isDarkmodeActivatedOnLocal =
    localStorage.getItem(LocalStorageKeys.IS_DARKMODE_ACTIVATED) ?? undefined;

  if (!isDarkmodeActivatedOnLocal) {
    const match = window.matchMedia("(prefers-color-scheme: dark)");

    localStorage.setItem(LocalStorageKeys.IS_DARKMODE_ACTIVATED, match.matches ? "true" : "false");
    return match.matches;
  }

  return JSON.parse(isDarkmodeActivatedOnLocal);
};

export const toggleIsDarkmodeActivatedOnLocal = () =>
  localStorage.setItem(
    LocalStorageKeys.IS_DARKMODE_ACTIVATED,
    JSON.stringify(!getIsDarkmodeActivatedOnLocal()),
  );

export const setIsDarkmodeActivatedOnLocal = (target: boolean) =>
  localStorage.setItem(LocalStorageKeys.IS_DARKMODE_ACTIVATED, JSON.stringify(target));
