import { getRequestBody } from "../request";

describe("getRequestBody", () => {
  it("should return the body of the request", async () => {
    const request = {
      json: jest.fn().mockResolvedValue({
        age: 24,
        name: "Shiwoo",
      }),
    };

    const result = await getRequestBody(request as any);

    expect(result).toEqual({
      age: 24,
      name: "Shiwoo",
    });
  });
});
