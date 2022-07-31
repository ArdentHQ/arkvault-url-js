import { Networks } from "./enums";
import { URLBuilder } from "./url-builder";

describe("URLBuilder", () => {
	it("should set coin", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("coin");

		expect(builder.coin()).toBe("coin");
	});

	it("should set nethash", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash("nethash");

		expect(builder.nethash()).toBe("nethash");
	});

	it("should set nethash from preset", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethashFromPreset("ark.devnet");

		expect(builder.nethash()).toBe(Networks["ark.devnet"]);
	});

	it("should throw when setting unkown nethash from preset", () => {
		const builder = new URLBuilder("baseUrl");

		expect(() => builder.setNethashFromPreset("unknown")).toThrowError("network does not exist");
	});

	it("should generate transfer url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("ARK");
		builder.setNethash(Networks["ark.mainnet"]);

		expect(builder.generateTransfer("recipient")).toBe(
			"baseUrl?recipient=recipient&method=Transfer&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should throw if coin is not set when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash(Networks["ark.mainnet"]);

		expect(() => builder.generateTransfer("recipient")).toThrowError("coin has to be set");
	});

	it("should throw if network is not set when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("ARK");

		expect(() => builder.generateTransfer("recipient")).toThrowError("nethash has to be set");
	});

	it("should require recipient when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("ARK");
		builder.setNethash(Networks["ark.mainnet"]);

		//@ts-ignore
		expect(() => builder.generateTransfer()).toThrowError("recipient is required");
	});
});
