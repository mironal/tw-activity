import * as request from "request";
import { OptionsWithUrl, RequestResponse } from "request";
import { isError } from "util";

export interface OAuth {
    consumer_key: string;
    consumer_secret: string;
    token: string;
    token_secret: string;
}

export type WebhookURL = string;
export type WebhookID = string;
export type PromiseResponse = Promise<RequestResponse>;

const URL = "https://api.twitter.com/1.1/account_activity/webhooks";

function withDefaultOption(opt: OptionsWithUrl): OptionsWithUrl {
    return {
        ...opt,
    };
}

function isErrorStatus(statusCode?: number) {
    return statusCode && 400 <= statusCode && statusCode < 600;
}

function promiseRequest(options: OptionsWithUrl, rejectOnErrorStatus: boolean): PromiseResponse {

    return new Promise((resolve, reject) => {
        request(options, (error: Error, response: RequestResponse, body: any) => {
            if (error) {
                reject(error);
                return;
            }

            if (rejectOnErrorStatus && isErrorStatus(response.statusCode)) {

                const statusError: any = new Error(`StatusCodeError: ${response.statusCode} - ${response.statusMessage}`);
                statusError.response = response;
                reject(statusError);
            } else {
                resolve(response);
            }
        });
    });
}

/**
 * Request: POST account_activity/webhooks
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * createWebhook("https://your.domain/webhook", oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param url - Webhook URL.
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function createWebhook(url: WebhookURL, oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        form: {
            url,
        },
        headers: {
        },
        method: "POST",
        oauth,
        url: `${URL}.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}

/**
 * Request: DELETE account_activity/webhooks/:webhook_id
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * deleteWebhook("your webhook id", oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param id - Webhook ID.
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function deleteWebhook(id: WebhookID, oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        method: "DELETE",
        oauth,
        url: `${URL}/${id}.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}

/**
 * Request: GET account_activity/webhooks
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * getWebhooks(oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function getWebhooks(oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        oauth,
        url: `${URL}.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}

/**
 * Request: POST account_activity/webhooks/:webhook_id/subscriptions
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * addSubscriptions("your webhook id", oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param id - Webhook ID.
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function addSubscriptions(id: WebhookID, oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        method: "POST",
        oauth,
        url: `${URL}/${id}/subscriptions.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}

/**
 * Request: DELETE account_activity/webhooks/:webhook_id/subscriptions
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * deleteSubscriptions("your webhook id", oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param id  - webhook ID
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function deleteSubscriptions(id: WebhookID, oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        method: "DELETE",
        oauth,
        url: `${URL}/${id}/subscriptions.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}

/**
 * Request: GET account_activity/webhooks/:webhook_id/subscriptions
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * getSubscriptions("your webhook id", oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param id  - webhook ID
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function getSubscriptions(id: WebhookID, oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        oauth,
        url: `${URL}/${id}/subscriptions.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}

/**
 * Request: PUT account_activity/webhooks/:webhook_id
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * triggerWebhookCRC("your webhook id", oauth)
 *     .then(response => console.log(response))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param id  - webhook ID
 * @param oauth - OAuth object.
 * @param rejectOnErrorStatus - If the http status code is an error, reject it.
 */
export function triggerWebhookCRC(id: WebhookID, oauth: OAuth, rejectOnErrorStatus: boolean = false): PromiseResponse {

    const options = withDefaultOption({
        method: "PUT",
        oauth,
        url: `${URL}/${id}.json`,
    });

    return promiseRequest(options, rejectOnErrorStatus);
}
