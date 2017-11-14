import * as nock from "nock";
import { promiseRequest } from "./preqeust";

afterEach(() => {
    nock.cleanAll();
});

describe("request with rejectOnErrorStatus = false", () => {

    test("should get 200", async () => {

        nock("http://example.com")
            .get("/")
            .reply(200);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(200);
    });

    test("should get 300", async () => {

        nock("http://example.com")
            .get("/")
            .reply(300);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(300);
    });

    test("should get 399", async () => {

        nock("http://example.com")
            .get("/")
            .reply(399);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(399);
    });

    test("should get 400", async () => {

        nock("http://example.com")
            .get("/")
            .reply(400);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(400);
    });

    test("should get 500", async () => {

        nock("http://example.com")
            .get("/")
            .reply(500);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(500);
    });

    test("should get 599", async () => {

        nock("http://example.com")
            .get("/")
            .reply(599);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(599);
    });

    test("should get 600", async () => {

        nock("http://example.com")
            .get("/")
            .reply(600);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, false);
        expect(resp.statusCode).toBe(600);
    });
});

describe("request with rejectOnErrorStatus = true", () => {

    test("should get 200", async () => {

        nock("http://example.com")
            .get("/")
            .reply(200);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, true);
        expect(resp.statusCode).toBe(200);
    });

    test("should get 300", async () => {

        nock("http://example.com")
            .get("/")
            .reply(300);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, true);
        expect(resp.statusCode).toBe(300);
    });

    test("should get 399", async () => {

        nock("http://example.com")
            .get("/")
            .reply(399);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, true);
        expect(resp.statusCode).toBe(399);
    });

    test("should reject with 400", async () => {

        nock("http://example.com")
            .get("/")
            .reply(400);

        await expect(promiseRequest({ url: "http://example.com" }, true))
            .rejects.toHaveProperty("message", "StatusCodeError: 400 - null");
    });
    test("should reject with 500", async () => {

        nock("http://example.com")
            .get("/")
            .reply(500);

        await expect(promiseRequest({ url: "http://example.com" }, true))
            .rejects.toHaveProperty("message", "StatusCodeError: 500 - null"); // nock returns null statusMessage.
    });

    test("should reject with 599", async () => {

        nock("http://example.com")
            .get("/")
            .reply(599);

        await expect(promiseRequest({ url: "http://example.com" }, true))
            .rejects.toHaveProperty("message", "StatusCodeError: 599 - null");
    });
    test("should get 600", async () => {

        nock("http://example.com")
            .get("/")
            .reply(600);

        const resp = await promiseRequest({
            url: "http://example.com",
        }, true);

        expect(resp.statusCode).toBe(600);
    });
});
