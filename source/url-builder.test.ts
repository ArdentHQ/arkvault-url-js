import { describe } from "@ardenthq/sdk-test";

import { Networks } from "./enums.js";
import { URLBuilder } from "./url-builder.js";

describe("URLBuilder", ({ assert, it }) => {
	it("should use default base url", () => {
		const builder = new URLBuilder();

		builder.setCoin("coin");
		builder.setNethash("nethash");

		assert.match(builder.generateTransfer("recipient"), new RegExp("^https://app.arkvault.io/#/"));
	});

	it("should use given base url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("coin");
		builder.setNethash("nethash");

		assert.match(builder.generateTransfer("recipient"), new RegExp("^baseUrl"));
	});

	it("should set coin", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("coin");

		assert.is(builder.coin(), "coin");
	});

	it("should set nethash", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash("nethash");

		assert.is(builder.nethash(), "nethash");
	});

	it("should set nethash from preset", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethashFromPreset("ark.devnet");

		assert.is(builder.nethash(), Networks["ark.devnet"]);
	});

	it("should throw when setting unkown nethash from preset", () => {
		const builder = new URLBuilder("baseUrl");

		assert.throws(() => builder.setNethashFromPreset("unknown"), "network does not exist");
	});

	it("should generate transfer url with memo", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { memo: "memo" }),
			"baseUrl?memo=memo&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should generate transfer url with amount", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { amount: 1000 }),
			"baseUrl?amount=1000&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should generate transfer url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient"),
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should throw if coin is not set when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setCoin("");

		assert.throws(() => builder.generateTransfer("recipient"), "coin has to be set");
	});

	it("should throw if network is not set when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash("");

		assert.throws(() => builder.generateTransfer("recipient"), "nethash has to be set");
	});

	it("should require recipient when generating url", () => {
		const builder = new URLBuilder("baseUrl");

		//@ts-ignore
		assert.throws(() => builder.generateTransfer(), "recipient is required");
	});

	it("should include memo", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { memo: "test" }),
			"baseUrl?memo=test&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should include amount", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { amount: 10 }),
			"baseUrl?amount=10&method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should not include amount & memo options if they are falsy", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { amount: undefined, memo: undefined }),
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);

		assert.is(
			builder.generateTransfer("recipient", { amount: NaN, memo: "" }),
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);

		assert.is(
			// @ts-ignore
			builder.generateTransfer("recipient", { amount: null, memo: "" }),
			"baseUrl?method=transfer&recipient=recipient&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should generate sign message url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(builder.generateMessageSign("test", { address: "address" }),
			"baseUrl?address=address&message=test&method=sign&coin=ARK&nethash=6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
		);
	});

	it("should require message when generating sign message url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.throws(() => builder.generateMessageSign(""), "message is required");
		//@ts-ignore
		assert.throws(() => builder.generateMessageSign(), "message is required");
		//@ts-ignore
		assert.throws(() => builder.generateMessageSign(undefined), "message is required");
	});
});
