import { TransferOptions } from "@/contracts";
import { Methods, Networks } from "@/enums";

export class URLBuilder {
	readonly #baseUrl: string;

	#coin: string | undefined;
	#nethash: string | undefined;

	public constructor(baseUrl: string) {
		this.#baseUrl = baseUrl;
	}

	public setCoin(coin: string) {
		this.#coin = coin;

		return this;
	}

	public setNethashFromPreset(network: Networks) {
		if (!Object.values(Networks).includes(network)) {
			throw new Error("network does not exist");
		}
	}

	public setNethash(nethash: string) {
		this.#nethash = nethash;

		return this;
	}

	public generateTransfer(recipient: string, options: TransferOptions = {}) {
		if (!recipient) {
			throw new Error("recipient is required");
		}

		options.method = Methods.Transfer;

		return this.#generate(options);
	}

	#generate(options: TransferOptions): string {
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
