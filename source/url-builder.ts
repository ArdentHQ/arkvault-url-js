import {
	GenerateMessageSignOptions,
	GenerateMessageVerifyOptions,
	GenerateTransferOptions,
	GenerateUsernameOptions,
	GenerateVoteOptions,
	MessageSignOptions,
	SignedMessage,
	TransferOptions,
} from "./contracts.js";
import { Methods, Networks } from "./enums.js";

export class URLBuilder {
	readonly #baseUrl: string;

	#nethash: string = Networks["mainsail.mainnet"];

	#coin?: string;

	// @TODO: Fix default url for mainsail once available.
	public constructor(baseUrl = "https://app.arkvault.io/#/") {
		this.#baseUrl = baseUrl;
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

	public setCoin(coin: string) {
		this.#coin = coin;

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

	public generateUsername(username: string) {
		if (!username) {
			throw new Error("username has to be set");
		}

		return this.#generate({
			method: Methods.Username,
			username,
		});
	}

	public generateVote(validatorPublicKey: string, username?: string) {
		const options: GenerateVoteOptions = {
			method: Methods.Vote,
			validator: validatorPublicKey,
		};

		if (username !== undefined) {
			options.username = username;
		}

		return this.#generate(options);
	}

	#generate(
		options:
			| GenerateTransferOptions
			| GenerateMessageSignOptions
			| GenerateMessageVerifyOptions
			| GenerateUsernameOptions
			| GenerateVoteOptions,
	): string {
		if (!this.#nethash) {
			throw new Error("nethash has to be set");
		}

		options.nethash = this.#nethash;
		if (this.#coin) {
			options.coin = this.#coin;
		}

		const queryString = new URLSearchParams(options as any).toString();

		return `${this.#baseUrl}?${queryString}`;
	}
}
