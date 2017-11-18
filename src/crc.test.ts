import responseToken from "./crc";

import { createHmac } from "crypto";

test("API scheme", () => {
    const api = require("./crc");
    expect(api).toMatchSnapshot();
});

test("responseToken", () => {

    const crc = "crc";
    const consumerSecret = "secret";

    const token = responseToken(crc, consumerSecret);

    const mac = createHmac("sha256", consumerSecret)
        .update(crc)
        .digest("base64");

    expect(token).toEqual({
        response_token: `sha256=${mac}`,
    });
});
