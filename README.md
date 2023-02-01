# Mass Email Extension for Directus Flows

* Will send an email for each individual recipient added in the "To" field, one by one
* Inspired by [this work](https://github.com/directus/directus/discussions/16726#discussioncomment-4324604) from [raphourbe](https://github.com/raphourbe)

> ⚠️ Disclaimer : DO NOT USE FOR SPAM ! Using this extension with a lot of emails requires to manage correctly anti-spam regulations, such as email server settings, unsubscribe link, etc. 

## Installation

Clone this project inside a folder, then:

```bash
cd mass-email-operation/
```

```bash
npm run build
```

* Place the content of the /dist folder into your directus folder => /extension/operations/mass-email-operation.
* Actualize your Directus App in the browser (F5)
