export const copyLink = async (targetUrl?: string) => {
  const resolvedTargetUrl = targetUrl ?? window.location.href;
  await window.navigator.clipboard.writeText(resolvedTargetUrl);
};
