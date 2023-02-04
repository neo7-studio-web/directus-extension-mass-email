# Mass Email Extension for Directus Flows

* Will send an email for each individual recipient added in the "To" field, one by one
* Inspired by [this work](https://github.com/directus/directus/discussions/16726#discussioncomment-4324604) from [raphourbe](https://github.com/raphourbe)

> ⚠️ Disclaimer : DO NOT USE FOR SPAM ! Using this extension with a lot of emails requires to manage correctly anti-spam regulations, such as email server settings, unsubscribe link, etc. 

## Installation

### Via npm

In your Directus installation root

```bash
npm i directus-extension-mass-email
```

Restart directus

### Or Manually

Clone this project inside a folder, then:

```bash
cd mass-email-operation/
```

```bash
npm run build
```

* Place the content of the /dist folder into your directus folder => /extension/operations/mass-email-operation.
* Restart & actualize (F5) your Directus App

## Usage

In a Flow you have now access to a "Mass Email" operation

## Batch & pause

This script will send emails one by one, with a pause of 1 minute every 50 emails.
