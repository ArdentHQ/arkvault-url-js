# ARKVault URL

<p align="center">
    <img src="./banner.png" />
</p>

> A package to generate URLs compatible with ARKVault

## Installation

```bash
pnpm install @ardenthq/arkvault-url
```

## Usage

Import and instantiate the builder.

```js
import { URLBuilder } from "@ardenthq/arkvault-url";

const builder = new URLBuilder("https://your-url.com");
```

> The `baseUrl` parameter is optional and defaults to "https://app.arkvault.io"

The builder can be further configured by setting a custom coin and nethash, which default to "ARK" and ARK's mainnet nethash otherwise.

```js
builder.setCoin("CUSTOM");
builder.setNethash("0123...cdef)";
```

### Methods

The following methods are available.

#### Transfer

```js
builder.generateTransfer("recipient");

> https://app.arkvault.io/#/?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988
```

#### Sign Message

```js
builder.generateMessageSign("hello world");

> https://app.arkvault.io/#/?method=sign&message=hello+world&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988"
```

> More detailed docs will follow soon

## Development

[pnpm](https://pnpm.js.org/en/) is required to be installed before starting. It is used to manage this repo.

### Apply `eslint` rules to source

```bash
pnpm run lint
```

### Apply `eslint` rules to tests

```bash
pnpm run lint:test
```

### Apply `prettier` formatting

```bash
pnpm run prettier
```

### Run tests

```bash
pnpm run test
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ardenthq.com. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [Ardent](https://ardenthq.com)
