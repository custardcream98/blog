export const addToClipboard = async (target: string) => {
  await window.navigator.clipboard.writeText(target)
}
