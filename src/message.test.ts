import * as message from "./message";

test("API scheme", () => {
    expect(message).toMatchSnapshot();
});
