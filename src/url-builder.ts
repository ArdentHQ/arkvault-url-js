import { GenerateMessageSignOptions, GenerateTransferOptions, MessageSignOptions, TransferOptions } from "@/contracts";
import { Methods, Networks } from "@/enums";

export class URLBuilder {
	readonly #baseUrl: string;

	#coin: string | undefined;
	#nethash: string | undefined;

	public constructor(baseUrl: string) {
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
			...options,
			method: Methods.Transfer,
			recipient,
		});
	}

	public generateMessageSign(address: string, options: MessageSignOptions = {}) {
		if (!address) {
			throw new Error("address is required");
		}

		if (!options.message) {
			throw new Error("message is required");
		}

		return this.#generate({
			...options,
			method: Methods.Sign,
			address,
		});
	}

	#generate(options: GenerateTransferOptions | GenerateMessageSignOptions): string {
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
