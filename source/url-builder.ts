import {
	GenerateMessageSignOptions,
	GenerateMessageVerifyOptions,
	GenerateTransferOptions,
	MessageSignOptions,
	SignedMessage,
	TransferOptions,
} from "./contracts.js";
import { Methods, Networks } from "./enums.js";

export class URLBuilder {
	readonly #baseUrl: string;

	#coin = "ARK";
	#nethash: string = Networks["ark.mainnet"];

	public constructor(baseUrl = "https://app.arkvault.io/#/") {
		this.#baseUrl = baseUrl;
	}

	public coin() {
		return this.#coin;
	}

	public setCoin(coin: string) {
		this.#coin = coin;

		return this;
	}

	public nethash() {
		return this.#nethash;
	}

	public setNethashFromPreset(network: string) {
		if (!Object.keys(Networks).includes(network)) {
			throw new Error("network does not exist");
		}

		this.#nethash = Networks[network];

		return this;
	}

	public setNethash(nethash: string) {
		this.#nethash = nethash;

		return this;
	}

	public generateTransfer(recipient: string, options: TransferOptions = {}) {
		if (!recipient) {
			throw new Error("recipient is required");
		}

		return this.#generate({
			...(options.memo && { memo: options.memo }),
			...(options.amount && { amount: options.amount }),
			method: Methods.Transfer,
			recipient,
		});
	}

	public generateMessageSign(message: string, options: MessageSignOptions = {}) {
		if (!message) {
			throw new Error("message is required");
		}

		return this.#generate({
			...options,
			message,
			method: Methods.Sign,
		});
	}

	public generateMessageVerify({ message, signatory, signature }: SignedMessage) {
		if (!message || !signatory || !signature) {
			throw new Error("signed message is invalid");
		}

		return this.#generate({
			message,
			method: Methods.Verify,
			signatory,
			signature,
		});
	}

	#generate(options: GenerateTransferOptions | GenerateMessageSignOptions | GenerateMessageVerifyOptions): string {
		if (!this.#coin) {
			throw new Error("coin has to be set");
		}

		if (!this.#nethash) {
			throw new Error("nethash has to be set");
		}

		options.coin = this.#coin;
		options.nethash = this.#nethash;

		const queryString = new URLSearchParams(options as any).toString();

		return `${this.#baseUrl}?${queryString}`;
	}
}
