import { Networks } from "./enums";
import { URLBuilder } from "./url-builder";

describe("URLBuilder", () => {
	it("should use default base url", () => {
		const builder = new URLBuilder();

		builder.setCoin("coin");
		builder.setNethash("nethash");

		expect(builder.generateTransfer("recipient")).toMatch(new RegExp("^https://app.arkvault.io/#/"));
	});

	it("should use given base url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("coin");
		builder.setNethash("nethash");

		expect(builder.generateTransfer("recipient")).toMatch(new RegExp("^baseUrl"));
	});

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

	it("should generate transfer url with memo", () => {
		const builder = new URLBuilder("baseUrl");

		expect(builder.generateTransfer("recipient", { memo: "memo" })).toBe(
			"baseUrl?memo=memo&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should generate transfer url with amount", () => {
		const builder = new URLBuilder("baseUrl");

		expect(builder.generateTransfer("recipient", { amount: 1000 })).toBe(
			"baseUrl?amount=1000&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should generate transfer url", () => {
		const builder = new URLBuilder("baseUrl");

		expect(builder.generateTransfer("recipient")).toBe(
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should throw if coin is not set when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("");

		expect(() => builder.generateTransfer("recipient")).toThrowError("coin has to be set");
	});

	it("should throw if network is not set when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash("");

		expect(() => builder.generateTransfer("recipient")).toThrowError("nethash has to be set");
	});

	it("should require recipient when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		//@ts-ignore
		expect(() => builder.generateTransfer()).toThrowError("recipient is required");
	});

	it("should include memo", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("ARK");
		builder.setNethash(Networks["ark.mainnet"]);

		expect(builder.generateTransfer("recipient", { memo: "test" })).toBe(
			"baseUrl?memo=test&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should include amount", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("ARK");
		builder.setNethash(Networks["ark.mainnet"]);

		expect(builder.generateTransfer("recipient", { amount: 10 })).toBe(
			"baseUrl?amount=10&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should not include amount & memo options they have falsy", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("ARK");
		builder.setNethash(Networks["ark.mainnet"]);

		expect(builder.generateTransfer("recipient", { amount: undefined, memo: undefined })).toBe(
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);

		expect(builder.generateTransfer("recipient", { amount: NaN, memo: "" })).toBe(
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);

		// @ts-ignore
		expect(builder.generateTransfer("recipient", { amount: null, memo: "" })).toBe(
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});
});
