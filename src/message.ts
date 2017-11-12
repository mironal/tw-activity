
export type MaybeString = string | undefined;

interface S {
    [prop: number]: string | undefined;
}

function lookup(statusCode: number, map: S): MaybeString {
    return map[statusCode];
}

/**
 * Convert the status code of `POST account_activity/webhooks`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/new-webhook-config}
 *
 * @example
 * ```typescript
 *
 * const oauth = {}
 * createWebhook("https://your.domain/webhook", oauth)
 *     .then(response => createWebHookMessage(response.statusCode)
 *     .then(message => console.log(message))
 *     .catch(error => console.error(error))
 * ```
 *
 * @param statusCode - status code
 */
export function createWebhookMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        200: "Webhook URL registered to provided application.",
    });
}

/**
 * Converts the status code of `DELETE account_activity/webhooks/:webhook_id`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/delete-webhook-config}
 *
 * @param statusCode - status code
 */
export function deleteWebhookMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        204: "Webhook has been removed from provided app.",
    });
}

/**
 * Convert the status code of `GET account_activity/webhooks`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/get-webhook-config}
 *
 * @param statusCode - status code
 */
export function getWebhooksMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        200: "All webhooks URLs successfully returned.",
    });
}

/**
 * Convert the status code of `POST account_activity/webhooks/:webhook_id/subscriptions`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/new-subscription}
 *
 * @param statusCode - status code
 */
export function addSubscriptionsMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        204: "Subscription added for provided user.",
    });
}

/**
 * Convert the status code of `DELETE account_activity/webhooks/:webhook_id/subscriptions`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/delete-subscription}
 *
 * @param statusCode - status code
 */
export function deleteSubscriptionsMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        204: "Active subscription for the user has been removed.",
        404: "There is no active subscription for the user.",
    });
}

/**
 * Convert the status code of `GET account_activity/webhooks/:webhook_id/subscriptions`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/get-subscription}
 *
 * @param statusCode - status code
 */
export function getSubscriptionsMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        204: "User has authorized the app with DM permissions and app has active subscription for the user.",
        404: "User has authorized the app with DM permissions, but there is no active subscription for the user.",
        401: "User has not authorized the app or the user has authorized the app without DM permissions. See included Twitter error code and message for details.",
    });
}

/**
 * Convert the status code of `PUT account_activity/webhooks/:webhook_id`
 * request into a human readable message.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/validate-webhook-config}
 *
 * @param statusCode - status code
 */
export function triggerWebhookCRCMessage(statusCode: number): MaybeString {
    return lookup(statusCode, {
        204: "CRC request successful and webhook status set to valid.",
    });
}
