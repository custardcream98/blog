export const safeNumber = (value: number | string) => {
  if (!value) {
    return 0
  }

  if (typeof value === "number") {
    return value
  }

  const resolvedValue = value.replaceAll(/[^0-9]/g, "")

  return Number(resolvedValue)
}
