import { describe } from "@ardenthq/sdk-test";

import { Networks } from "./enums.js";
import { URLBuilder } from "./url-builder.js";

describe("URLBuilder", ({ assert, it }) => {
	it("should use default base url", () => {
		const builder = new URLBuilder();

		builder.setNethash("nethash");

		assert.match(builder.generateTransfer("recipient"), new RegExp("^https://app.arkvault.io/#/"));
	});

	it("should use given base url", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash("nethash");

		assert.match(builder.generateTransfer("recipient"), new RegExp("^baseUrl"));
	});

	it("should set nethash", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethash("nethash");

		assert.is(builder.nethash(), "nethash");
	});

	it("should set nethash from preset", () => {
		const builder = new URLBuilder("baseUrl");

		builder.setNethashFromPreset("mainsail.devnet");

		assert.is(builder.nethash(), Networks["mainsail.devnet"]);
	});

	it("should throw when setting unkown nethash from preset", () => {
		const builder = new URLBuilder("baseUrl");

		assert.throws(() => builder.setNethashFromPreset("unknown"), "network does not exist");
	});

	it("should generate transfer url with memo", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { memo: "memo" }),
			"baseUrl?memo=memo&method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should generate transfer url with amount", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { amount: 1000 }),
			"baseUrl?amount=1000&method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should generate transfer url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient"),
			"baseUrl?method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
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
			"baseUrl?memo=test&method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should include amount", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { amount: 10 }),
			"baseUrl?amount=10&method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should not include amount & memo options if they are falsy", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateTransfer("recipient", { amount: undefined, memo: undefined }),
			"baseUrl?method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);

		assert.is(
			builder.generateTransfer("recipient", { amount: NaN, memo: "" }),
			"baseUrl?method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);

		assert.is(
			// @ts-ignore
			builder.generateTransfer("recipient", { amount: null, memo: "" }),
			"baseUrl?method=transfer&recipient=recipient&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should generate sign message url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateMessageSign("test", { address: "address" }),
			"baseUrl?address=address&message=test&method=sign&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should generate username url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateUsername("alfy"),
			"baseUrl?method=username&username=alfy&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should require username when generating username url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.throws(() => builder.generateUsername(""), new Error("signed message is invalid"));
	});

	it("should require message when generating sign message url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.throws(() => builder.generateMessageSign(""), "message is required");
		//@ts-ignore
		assert.throws(() => builder.generateMessageSign(), "message is required");
		//@ts-ignore
		assert.throws(() => builder.generateMessageSign(undefined), "message is required");
	});

	it("should generate verify message url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateMessageVerify({
				message: "hello world",
				signatory: "025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7ca",
				signature:
					"22f8ef55e8120fbf51e2407c808a1cc98d7ef961646226a3d3fad606437f8ba49ab68dc33c6d4a478f954c72e9bac2b4a4fe48baa70121a311a875dba1527d9d",
			}),
			"baseUrl?message=hello+world&method=verify&signatory=025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7ca&signature=22f8ef55e8120fbf51e2407c808a1cc98d7ef961646226a3d3fad606437f8ba49ab68dc33c6d4a478f954c72e9bac2b4a4fe48baa70121a311a875dba1527d9d&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should require all properties of signed message when generating verify message url", () => {
		const builder = new URLBuilder("baseUrl");

		assert.throws(
			() =>
				builder.generateMessageVerify({
					//@ts-ignore
					message: undefined,
					signatory: "025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7ca",
					signature:
						"22f8ef55e8120fbf51e2407c808a1cc98d7ef961646226a3d3fad606437f8ba49ab68dc33c6d4a478f954c72e9bac2b4a4fe48baa70121a311a875dba1527d9d",
				}),
			new Error("signed message is invalid"),
		);

		assert.throws(
			() =>
				builder.generateMessageVerify({
					message: "hello world",
					//@ts-ignore
					signatory: undefined,
					signature:
						"22f8ef55e8120fbf51e2407c808a1cc98d7ef961646226a3d3fad606437f8ba49ab68dc33c6d4a478f954c72e9bac2b4a4fe48baa70121a311a875dba1527d9d",
				}),
			new Error("signed message is invalid"),
		);

		assert.throws(
			() =>
				builder.generateMessageVerify({
					message: "hello world",
					signatory: "025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7ca",
					//@ts-ignore
					signature: undefined,
				}),
			new Error("signed message is invalid"),
		);
	});

	it("should generate a vote url from validator public key", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateVote("03a461f557c88612328c8e6d69991eaa7916359dfd2c6a65fd988b672a8bb780c4"),
			"baseUrl?method=vote&validator=03a461f557c88612328c8e6d69991eaa7916359dfd2c6a65fd988b672a8bb780c4&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});

	it("should generate a vote url with username", () => {
		const builder = new URLBuilder("baseUrl");

		assert.is(
			builder.generateVote("03a461f557c88612328c8e6d69991eaa7916359dfd2c6a65fd988b672a8bb780c4", "alfy"),
			"baseUrl?method=vote&validator=03a461f557c88612328c8e6d69991eaa7916359dfd2c6a65fd988b672a8bb780c4&username=alfy&nethash=c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		);
	});
});
