const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const data = {
      from: "Jethro",
      text: "This is a test"
    };
    const response = generateMessage(data.from, data.text);
    expect(response).toInclude(data);
    expect(response.createdAt).toBeA("number");
  });
});
