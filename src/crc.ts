import { createHmac } from "crypto";

/**
 * Create the CRC response.
 *
 * {@link https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/guides/securing-webhooks}
 *
 * @example
 * ```js
 *
 * function serverWebhookGetEndpoint(request, response) {
 *   const { crc_token } = request.query;
 *   if (crc_token) {
 *     const response_token = responseToken(crc_token, "your consumer secret")
 *     response.status(200).send({
 *       response_token
 *    });
 *  } else {
 *    console.error("crc_token missing from request.");
 *    response.sendStatus(400);
 *  }
 * ```
 *
 * @param crcToken - crc token
 * @param consumerSecret - consumer key secret.
 */
export default function responseToken(crcToken: string, consumerSecret: string) {
    const hmac = createHmac("sha256", consumerSecret).update(crcToken).digest("base64");
    return {
        response_token: `sha256=${hmac}`,
    };
}
