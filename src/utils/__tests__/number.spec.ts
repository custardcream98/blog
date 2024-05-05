import { safeNumber } from "../number"

describe("safeNumber", () => {
  it("should return a number", () => {
    expect(safeNumber(1)).toEqual(1)

    expect(safeNumber("1")).toEqual(1)

    expect(safeNumber("1a")).toEqual(1)

    expect(safeNumber("a1")).toEqual(1)

    expect(safeNumber("a1a")).toEqual(1)

    expect(safeNumber("a1a2")).toEqual(12)

    expect(safeNumber("a1a2a")).toEqual(12)
  })

  it("should return 0", () => {
    expect(safeNumber("")).toEqual(0)

    expect(safeNumber("a")).toEqual(0)
  })
})
