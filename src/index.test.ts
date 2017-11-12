import * as webhook from "./index";

test("API sheme", () => {
    expect(webhook).toMatchSnapshot();
});
