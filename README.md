# tw-activity


[![NPM](https://nodei.co/npm/tw-activity.png)](https://nodei.co/npm/tw-activity/)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/mironal/tw-activity/blob/master/LICENSE) [![Build Status](https://travis-ci.org/mironal/tw-activity.svg)](https://travis-ci.org/mironal/tw-activity) [![Greenkeeper badge](https://badges.greenkeeper.io/mironal/tw-activity.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/mironal/tw-activity/branch/master/graph/badge.svg)](https://codecov.io/gh/mironal/tw-activity)

A library for the Twitter Account Activity API. https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/overview

## How to use

### Use in your shell

```sh
# install
npm install -g tw-activity

tw-activity --help
```

### Use in your code

```
# install package
npm install tw-activity --save
```

```js
// index.js

const {
    createWebhook
} = require("tw-activity")

const url = "https://your.domain/webhook"

const oauth = {
    // your consumer key...
}

createWebhook(url, oauth)
  .then(resp => console.log(resp.body)) // may got `"[]"`
  .catch(error => console.error(error))
```

#### Reject on error status code

You can use `rejectOnErrorStatus` to catch errors when you
receive the error status code (4xx or 5xx).

Default is false.

```js
createWebhook(url, oauth, true) // <- if got status code 4xx or 5xx.
  .then(resp => console.log(resp.body))
  .catch(error => console.error(error)) // <- you will catch the error.
```

For more example. you can see the `/bin/tw-activity`

### Use in your server side code

You can also generate response of your Webhook server.

```js
const { responseToken } = require("tw-activity").crc

 function serverWebhookGetEndpoint(request, response) {
   const { crc_token } = request.query;
   if (crc_token) {
     const response_token = responseToken(crc_token, "your consumer secret")
     response.status(200).send({
       response_token
    });
  } else {
    console.error("crc_token missing from request.");
    response.sendStatus(400);
  }
}
```

[More detail](https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/guides/securing-webhooks)


## API document

[API document is here](https://mironal.github.io/tw-activity/)

## CLI usage

```
tw-activity [command]

Commands:
  tw-activity --help           Show help                     [aliases: -h, help]
  tw-activity create-wh <url>  Create webhook config
  tw-activity delete-wh <id>   Delete webhook config
  tw-activity get-wh           Get webhook config
  tw-activity add-sub <id>     Add subscription
  tw-activity delete-sub <id>  Delete subscription
  tw-activity get-sub <id>     Get subscriptions
  tw-activity trigger <id>     Tritter CRC request

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --config   Twitter config file                      [default: "./config.json"]
  --verbose  Be verbose                               [boolean] [default: false]

```

### Twitter config

Pass the twitter config json file.

```
--config [path]
```

```
{
    "TWITTER_CONSUMER_KEY": "",
    "TWITTER_CONSUMER_SECRET": "",
    "TWITTER_ACCESS_TOKEN": "",
    "TWITTER_ACCESS_TOKEN_SECRET": ""
}
```
