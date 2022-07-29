import { URLBuilder } from "./url-builder";

describe("URLBuilder", () => {
  it("should set coin", () => {
    const builder = new URLBuilder("baseUrl");

    builder.setCoin("coin");

    expect(builder.coin()).toBe("coin");
  });

  it("should set nethash", () => {
    const builder = new URLBuilder("baseUrl");

    builder.setNethash("nethash");

    expect(builder.nethash()).toBe("nethash");
  });
});
