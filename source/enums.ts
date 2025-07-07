enum Methods {
	"Transfer" = "transfer",
	"Sign" = "sign",
	"Verify" = "verify",
	"Username" = "username",
	"Vote" = "vote",
}

enum Networks {
	"mainsail.devnet" = "c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
	// @TODO: fix default nethash once available.
	"mainsail.mainnet" = "c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
}

export { Methods, Networks };
