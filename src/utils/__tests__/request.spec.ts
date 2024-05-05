import { getRequestBody, parseSearchParams } from "../request"

describe("getRequestBody", () => {
  it("should return the body of the request", async () => {
    const request = {
      json: jest.fn().mockResolvedValue({
        age: 24,
        name: "Shiwoo",
      }),
    }

    const result = await getRequestBody(request as any)

    expect(result).toEqual({
      age: 24,
      name: "Shiwoo",
    })
  })
})

describe("parseSearchParams", () => {
  it("should return the params of the url", () => {
    const url = "http://localhost:3000/?name=Shiwoo&age=24"
    const result = parseSearchParams<{ name: string; age: number }>(url)

    expect(result).toEqual({ age: "24", name: "Shiwoo" })
  })
})
