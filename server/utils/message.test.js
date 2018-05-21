const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

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

describe("generateLocationMessage", () => {
  it("should generate correct location message object", () => {
    const from = "Jethro";
    const latitude = "-34.151248";
    const longitude = "19.914672";
    const url = `https://google.com/maps/?q=${latitude},${longitude}`;
    const response = generateLocationMessage(from, latitude, longitude);
    expect(response).toInclude({ from, url });
    expect(response.createdAt).toBeA("number");
  });
});
