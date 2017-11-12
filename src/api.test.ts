import {
    addSubscriptions,
    createWebhook,
    deleteSubscriptions,
    deleteWebhook,
    getSubscriptions,
    getWebhooks,
    triggerWebhookCRC,
} from "./api";

import * as nock from "nock";

const OAUTH = {
    consumer_key: "ck",
    consumer_secret: "cs",
    token: "t",
    token_secret: "ts",
};

const OAUTH_HEADER_TEST_REGEX = /^OAuth oauth_consumer_key="ck",.+/;

afterEach(() => {
    nock.cleanAll();
});

test("API scheme", () => {
    const api = require("./api");
    expect(api).toMatchSnapshot();
});

test("createWebhook", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks.json", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .post("")
        .reply(200, {
            id: "1234",
            url: "https://example.com/webhook",
            valid: true,
            // tslint:disable-next-line:object-literal-sort-keys
            created_timestamp: "2016-06-02T23:54:02Z",
        });

    const response = await createWebhook("https://example.com/webhook", OAUTH);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
        id: "1234",
        url: "https://example.com/webhook",
        valid: true,
        // tslint:disable-next-line:object-literal-sort-keys
        created_timestamp: "2016-06-02T23:54:02Z",
    });
});

test("deleteWebhook", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .delete(`/${123}.json`)
        .reply(204);

    const resp = await deleteWebhook("123", OAUTH);
    expect(resp.statusCode).toBe(204);
});

test("getWebhooks", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks.json", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .get("")
        .reply(200, [{
            id: "1",
            url: "https://example.com/webhook",
            valid: true,
            // tslint:disable-next-line:object-literal-sort-keys
            created_timestamp: "134325325301",
        }]);

    const resp = await getWebhooks(OAUTH);
    expect(resp.statusCode).toBe(200);
    expect(JSON.parse(resp.body)).toEqual([{
        id: "1",
        url: "https://example.com/webhook",
        valid: true,
        // tslint:disable-next-line:object-literal-sort-keys
        created_timestamp: "134325325301",
    }]);
});

test("addSubscriptions", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .post(`/${1234}/subscriptions.json`)
        .reply(204);

    const resp = await addSubscriptions("1234", OAUTH);
    expect(resp.statusCode).toBe(204);
});

test("deleteSubscriptions", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .delete(`/${1234}/subscriptions.json`)
        .reply(204);

    const resp = await deleteSubscriptions("1234", OAUTH);
    expect(resp.statusCode).toBe(204);
});

test("getSubscriptions", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .get(`/${1234}/subscriptions.json`)
        .reply(204);

    const resp = await getSubscriptions("1234", OAUTH);
    expect(resp.statusCode).toBe(204);
});

test("triggerWebhookCRC", async () => {

    nock("https://api.twitter.com/1.1/account_activity/webhooks", {
        reqheaders: {
            authorization: OAUTH_HEADER_TEST_REGEX,
        },
    })
        .put(`/${1234}.json`)
        .reply(204);

    const resp = await triggerWebhookCRC("1234", OAUTH);
    expect(resp.statusCode).toBe(204);
});
